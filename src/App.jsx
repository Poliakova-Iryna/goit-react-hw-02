import { useState, useEffect } from "react"
import Description from "./components/Description/Description";
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";
import Notification from "./components/Notification/Notification";

const App = () => {
 const [feedbackTypeData, setFeedbackTypeData] = useState(() => {
  const savedFeedback = localStorage.getItem('feedbackTypeData');
  return savedFeedback ? JSON.parse(savedFeedback) : {good: 0, neutral: 0, bad:0};
 });

 useEffect(() => {
  localStorage.setItem("feedbackTypeData", JSON.stringify(feedbackTypeData));
 }, [feedbackTypeData]);

 const updateFeedback = (feedbackType) => {
  setFeedbackTypeData((prevFeedback) => ({
    ...prevFeedback, [feedbackType]: prevFeedback[feedbackType] + 1,
  }));
 };

 const resetFeedback = () => {
  setFeedbackTypeData({good:0, neutral: 0, bad:0});
 };

 const totalFeedback = feedbackTypeData.good + feedbackTypeData.neutral + feedbackTypeData.bad;
 const positiveFeedback = Math.round((feedbackTypeData.good / totalFeedback) * 100);

  return (
    <div>
      <Description />
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} resetFeedback={resetFeedback}/>
      {totalFeedback > 0 ? (<Feedback feedbackData={feedbackTypeData} totalFeedback={totalFeedback} positiveFeedback={positiveFeedback}/>) : 
      (<Notification />)}
    </div>
  )
}

export default App