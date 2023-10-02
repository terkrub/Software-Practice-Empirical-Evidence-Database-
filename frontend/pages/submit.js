import { useState } from 'react';
import styles from './styles/submitStyles.module.css';
import Header from './component/Header';

const SubmitArticle = () => {
  const [articleData, setArticleData] = useState({
    title: '',
    authors: '',
    journal: '',
    year: '',
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
    console.log('Article Data:', articleData);
    try {
      const res = await axios.get(``);
    } catch (err) {
      console.log(err);
    }

  };

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
            {renderInputField('Year of Publication:', 'number', 'year')}
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
