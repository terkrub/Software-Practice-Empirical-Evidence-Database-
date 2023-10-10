import { useState } from 'react';
import styles from './styles/submitStyles.module.css';
import Header from './component/Header';
import axios from 'axios';

const SubmitArticle = () => {
  const [articleData, setArticleData] = useState({
    title: '',
    authors: '',
    journalName: '',
    yearOfPublication: '',
    volume: '',
    number: '',
    pages: '',
    doi: '',
    isDuplicate: false,
  });

  const [feedback, setFeedback] = useState(''); // To provide feedback to the user
  const [underReview, setUnderReview] = useState(false); // To simulate the review mechanism

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:4000/articles`, { article: articleData });
      if (res.status === 200) {
        setFeedback({ message: 'Article submitted successfully and is under review.', type: 'success' });
        setUnderReview(true);
      } else {
        setFeedback({ message: 'There was an issue submitting the article. Please try again.', type: 'error' });
      }
    } catch (err) {
      setFeedback({ message: `Error: ${err.message}`, type: 'error' });
    }
};

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 100;

  const renderInputField = (label, type, name, numericOnly = false) => (
    <label className={styles.label} htmlFor={name}>
        {label}
        <input
            type={type}
            id={name}
            name={name}
            value={articleData[name]}
            onChange={handleChange}
            onKeyPress={numericOnly ? handleNumericInput : null}
            required
            className={styles.input}
        />
    </label>
);

  const renderSelectField = (label, name) => (
    <label className={styles.label} htmlFor={name}>
      {label}
      <select
        id={name}
        name={name}
        value={articleData[name]}
        onChange={handleChange}
        required
        className={styles.input}
      >
        <option value="">Select Year</option>
        {Array.from({ length: 101 }, (_, index) => (
          <option key={index} value={startYear + index}>
            {startYear + index}
          </option>
        ))}
      </select>
    </label>
  );

  const handleNumericInput = (e) => {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
};

return (
  <>
      <Header />
      <div className={styles.wrapper}>
          <div className={styles.container}>
              <h1 className={styles.h1}>SUBMIT</h1>
              
              <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.row}>
                      {renderInputField('Title:', 'text', 'title')}
                      {renderInputField('Authors:', 'text', 'authors')}
                  </div>
                  <div className={styles.row}>
                      {renderInputField('Journal Name:', 'text', 'journalName')}
                      {renderSelectField('Year of Publication:', 'yearOfPublication')}
                  </div>
                  <div className={styles.row}>
                      {renderInputField('Volume:', 'text', 'volume', true)}
                      {renderInputField('Number:', 'text', 'number', true)}
                  </div>
                  <div className={styles.row}>
                      {renderInputField('Pages:', 'text', 'pages', true)}
                      {renderInputField('DOI:', 'text', 'doi')}
                  </div>
                  <button type="submit" className={styles.button}>Submit</button>
              </form>
              {feedback && <p className={`${styles.feedback} ${styles[feedback.type]}`}>{feedback.message}</p>}
              {underReview && <p className={styles.review}>Your article is under review.</p>} 
          </div>
      </div>
  </>
  );
};

export default SubmitArticle;
