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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(articleData);
    try {
      const res = await axios.post("https://backend-e4sq9s1cr-rjg0194-autacnz.vercel.app/articles",{article: articleData});
      console.log(res)
    } catch (err) {
      console.log(err);
    }

  };

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 100;

  const renderInputField = (label, type, name) => (
    <label className={styles.label} htmlFor={name}>
      {label}
      <input
        type={type}
        id={name}
        name={name}
        value={articleData[name]}
        onChange={handleChange}
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

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1 className={styles.h1}>Submit an Article</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            {renderInputField('Title:', 'text', 'title')}
            {renderInputField('Authors:', 'text', 'authors')}
            {renderInputField('Journal Name:', 'text', 'journal')}
            {renderSelectField('Year of Publication:', 'year')}
            {renderInputField('Volume:', 'text', 'volume')}
            {renderInputField('Number:', 'text', 'number')}
            {renderInputField('Pages:', 'text', 'pages')}
            {renderInputField('DOI:', 'text', 'doi')}
            <button type="submit" className={styles.button}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SubmitArticle;
