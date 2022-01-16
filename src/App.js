import React, {useRef, useEffect, useState} from 'react';
import './app.scss';

// Import dependencies
import * as qna from "@tensorflow-models/qna";
import {
  Loading,
  Accordion,
  AccordionItem,
  Link,
  ModalWrapper,
}from "carbon-components-react";

const App = () => {
  //Setup references and state hooks
  const passageRef = useRef(null); 
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState(); 
  const [model, setModel] = useState(null); 

  // Load Tensorflow Model
  const loadModel = async ()=>{
    const loadedModel = await qna.load()
    setModel(loadedModel); 
    console.log('Model Loaded Successfully.')
  } 

  //Handle Questions
  const answerQuestion = async (e) =>{
    if (e.which === 13 && model !== null ){
      console.log('Question submitted.');
      const passage = passageRef.current.value;
      const question = questionRef.current.value;

      const answers = await model.findAnswers(question, passage);
      setAnswer(answers); 
      console.log(answers);

    }  
  }

  useEffect(()=>{loadModel()}, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className='navbar'>
          <div className='projectTitle'>NLP</div>
          <ul className='menu'>
            <li><Link href='#intro'>Introduction</Link></li>
            <li><Link href='#Questiontitle'>QnA Project Demo</Link></li>
          </ul>
        </div>
        <section className='intro'> <b>Introduction</b>
          <Accordion>
            <AccordionItem title="What is natural language processing (NLP)?">
              <p>Natural language processing (NLP) refers to the branch of computer science—and more specifically, 
                the branch of artificial intelligence or AI—concerned with giving computers the ability to understand 
                text and spoken words in much the same way human beings can. NLP combines computational linguistics—rule-based 
                modeling of human language—with statistical, machine learning, and deep learning models. Together, 
                these technologies enable computers to process human language in the form of text or voice data and to 
                "understand" its full meaning, complete with the speaker or writer’s intent and sentiment.
                NLP drives computer programs that translate text from one language to another, respond to spoken commands, 
                and summarize large volumes of text rapidly—even in real time. There’s a good chance you’ve interacted with NLP 
                in the form of voice-operated GPS systems, digital assistants, speech-to-text dictation software, customer service chatbots, 
                and other consumer conveniences. But NLP also plays a growing role in enterprise solutions that help streamline business operations, 
                increase employee productivity, and simplify mission-critical business processes.  </p></AccordionItem>
            <AccordionItem title="Why is NLP important?">
              <p>(1)Large volumes of textual data: Natural language processing helps computers communicate with humans in their own language and scales 
                other language-related tasks. For example, NLP makes it possible for computers to read text, hear speech, interpret it, measure sentiment 
                and determine which parts are important. Today’s machines can analyze more language-based data than humans, without fatigue and in a consistent, 
                unbiased way. Considering the staggering amount of unstructured data that’s generated every day, from medical records to social media, 
                automation will be critical to fully analyze text and speech data efficiently.
                (2)Structuring a highly unstructured data source: Human language is astoundingly complex and diverse. We express ourselves in infinite ways, 
                both verbally and in writing. Not only are there hundreds of languages and dialects, but within each language is a unique set of grammar and 
                syntax rules, terms and slang. When we write, we often misspell or abbreviate words, or omit punctuation. When we speak, we have regional accents, 
                and we mumble, stutter and borrow terms from other languages. While supervised and unsupervised learning, and specifically deep learning, 
                are now widely used for modeling human language, there’s also a need for syntactic and semantic understanding and domain expertise that are not 
                necessarily present in these machine learning approaches. NLP is important because it helps resolve ambiguity in language and adds useful 
                numeric structure to the data for many downstream applications, such as speech recognition or text analytics. </p>
              </AccordionItem>
            <AccordionItem title="How does NLP work?"><p>Natural language processing includes many different techniques for interpreting human language, 
              ranging from statistical and machine learning methods to rules-based and algorithmic approaches. We need a broad array of approaches 
              because the text- and voice-based data varies widely, as do the practical applications. Basic NLP tasks include tokenization and parsing, 
              lemmatization/stemming, part-of-speech tagging, language detection and identification of semantic relationships. If you ever diagramed sentences in grade school, 
              you’ve done these tasks manually before. In general terms, NLP tasks break down language into shorter, elemental pieces, 
              try to understand relationships between the pieces and explore how the pieces work together to create meaning. These underlying tasks are often used in higher-level NLP capabilities, such as: 
              (1)Content categorization. A linguistic-based document summary, including search and indexing, content alerts and duplication detection.
              (2)Topic discovery and modeling. Accurately capture the meaning and themes in text collections, and apply advanced analytics to text, like optimization and forecasting.
              (3)Contextual extraction. Automatically pull structured information from text-based sources.
              (4)Sentiment analysis. Identifying the mood or subjective opinions within large amounts of text, including average sentiment and opinion mining. 
              (5)Speech-to-text and text-to-speech conversion. Transforming voice commands into written text, and vice versa. 
              (6)Document summarization. Automatically generating synopses of large bodies of text.
              (7)Machine translation. Automatic translation of text or speech from one language to another.
              In all these cases, the overarching goal is to take raw language input and use linguistics and algorithms to transform or enrich the text in such a way that it delivers greater value. </p></AccordionItem>
          </Accordion>
        </section>
        <ModalWrapper
      buttonTriggerText="Project Intro"
      modalHeading="What is the project about?"
      passiveModal="true"
      >
      <p>This is a question answering web app based on Natural Language Processing(NLP) with
            a pre-trained BERT model from Tensorflow.JS. The basic idea behind this project is that the model
            will give answers to the question asked by the user based on the text and score the answers based on
            accuracy.</p>
    </ModalWrapper>
        
        {model ==null ? 
          <div>
            <Loading description='Model Loading...'/>
          </div> 
          :
          <section className='demo'>  
          <div className='container'>
            <div className='title'><b>Text</b></div>
            <textarea ref={passageRef} rows="30" cols="100"></textarea>
            <div className='Questiontitle'><b>Ask A Question</b></div>
            <input ref={questionRef} onKeyPress={answerQuestion} size="80"></input>
            <br /> 
            {answer ? answer.map((ans, idx) =><div>Answer {idx+1} -  {ans.text} ({Math.floor(ans.score*100)/100})</div>) : "Information Not Found"}
          </div>
          </section>
        } 
        
      </header>
    </div>
  );
    
}

export default App