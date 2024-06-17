import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { Segment } from 'semantic-ui-react';
import './ChatBot.css';

const Bot = ({ visible }) => {
  const [history, setHistory] = useState([]);

  const handleEnd = ({ steps, values }) => {
    const message = values[values.length - 1];
    if (!history.includes(message)) {
      setHistory([...history, message]);
    }
  };

  const steps = [
    {
      id: '1',
      message: 'Hi there! How can I assist you today?',
      trigger: 'options',
    },
    {
      id: 'options',
      options: [
        { value: 'order_status', label: 'Check Order Status', trigger: 'order_status' },
        { value: 'cooking_tips', label: 'Get Cooking Tips', trigger: 'cooking_tips' },
        { value: 'cuisine_info', label: 'Learn about Cuisines', trigger: 'cuisine_info' },
        { value: 'healthy_eating', label: 'Healthy Eating Tips', trigger: 'healthy_eating' },
        { value: 'Others', label: 'Others', trigger: 'input' }
      ],
    },
    {
      id: 'order_status',
      message: 'You can track your order in the Track Order section.',
      trigger: 'options',
    },
    {
      id: 'cooking_tips',
      message: 'Check out our Cook Your Meal section for great cooking tips!',
      trigger: 'options',
    },
    {
      id: 'cuisine_info',
      message: 'We have a wide range of cuisines! From Italian to Chinese, we cover it all.',
      trigger: 'options',
    },
    {
      id: 'healthy_eating',
      message: 'For healthy eating tips, focus on balanced meals with plenty of fruits and vegetables.',
      trigger: 'options',
    },
    {
      id: 'input',
      user: true,
      trigger: 'user_input',
    },
    {
      id: 'user_input',
      message: 'Our Customer Care will contact you soon...',
      trigger: 'options',
    },
  ];

  const botStyle = {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    zIndex: 999,
  };

  if (!visible) return null;

  return (
    <Segment floated='left' style={botStyle}>
      <ChatBot
        steps={steps}
        botDelay={1000}
        handleEnd={handleEnd}
        speechSynthesis={{ enable: true, lang: 'en' }}
        headerTitle="Mr.Foodie"
        recognitionEnable={true}
        style={{
          width: '300px',
        }}
        bubbleStyle={{
          backgroundColor: 'green',
          color: '#fff'
        }}
      />
    </Segment>
  );
};

export default Bot;
