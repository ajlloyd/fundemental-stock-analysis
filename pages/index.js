import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import React, { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import {TiTick} from "react-icons/ti"
import {RiMoneyPoundCircleFill} from "react-icons/ri"
import { Button } from 'react-bootstrap';

export default function Home(props) {
  
  const [inputList, setInputList] = useState([{ ticker: "" }]);




  // handle input change:
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...inputList];
    list[index] = value;
    setInputList(list);
  };
  
  // handle click event of the Remove button:
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  
  // handle click event of the Add button:
  const handleAddClick = () => {
    console.log(inputList)
    var length = inputList.length;
    if (length <= 1) {
      setInputList([...inputList, { ticker: "" }]);
    } else {
      alert("You may only compare 2 stocks at once in this version")
    }
  };

  // NextJS router - push to fundementals:
  const router = useRouter();
  const [route, setRoute] = useState();
  const tickers = inputList
  const handleSubmit = (e) => {
    
    e.preventDefault()
    router.push({
      pathname: "/fundementals",
      query: tickers
    },
    "fundementals");
    console.log("app index.js")
    console.log(tickers)
    console.log(tickers.length)
}

  return (
    <div className={styles.container}>

      <Head>
        <title>AJL Financials | Fundemental Stock Analysis Tool </title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      
      <nav className={styles.navBar}>
        <div className={styles.navLeft}>
          <a href="https://ajlloyd-solutions.herokuapp.com/"><RiMoneyPoundCircleFill/> AJL Financials</a>
        </div>
        <div className={styles.navRight}>
          <Link href='/documentation'>Documentation</Link>
          <a href="mailto:ajlloyd.dev@gmail.com">Contact</a>
        </div>
      </nav>

      <main className={styles.main}>
      
        <h1 className={styles.title}>
          Compare Your Stocks Now
        </h1>
        <ul> <TiTick/> Stock Fundementals</ul>
        <ul> <TiTick/> Realtime Price Data </ul>
        <ul> <TiTick/> Income and Balance Sheets Updated Each Quarter</ul>

        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
            {inputList.map((x, i) => {
            return (
              <div className={styles.inputRow} key={`inputField${i}`}>
                <input className={styles.input} name="ticker" placeholder="Enter Ticker" value={x.ticker} onChange={e => handleInputChange(e, i)}  />
                <div className={styles.buttonContainer}>
                  {inputList.length !== 1 &&
                    <Button className="btn-sm" variant="link" onClick={() => handleRemoveClick(i)}>Remove</Button> }
                  {inputList.length - 1 === i && 
                    <Button className="btn-sm" variant="link" onClick={handleAddClick}>Add</Button>}
                </div>
              </div>
            );
          })}
          </div>
          <Button className={styles.submitButton} variant="primary" type="submit" action="/fundementals">Submit </Button>
        </form>

      </main>

      <div className={styles.footer}>
          <small>Copyright Aaron Lloyd Development © </small>
          <small>ajlloyd.dev@gmail.com </small>
          <small>Version 22.3</small>
      </div>
      

  </div>
  )
}
