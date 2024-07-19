import React, { useEffect, useState } from "react";

const useQuotes = () => {

  // we are grabbing a list of quotes
  const [quotesList, setQuotesList] = useState([]);

  // we are setting an index to randomly grab a quote
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(null);

  useEffect(() => {

    // fetch quote list from public folder
    const fetchData = async () => {
      try {
        const response = await fetch("./quotes.json");
        if (!response) {
          throw new Error("error: ", response.status);
        } else {
          const data = await response.json();
          console.log(data);
          setQuotesList(data.quotes);
          selectRandomQuote();
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const selectRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotesList.length);
    setCurrentQuoteIndex(randomIndex);
  };

  const MINUTE_MS = 12000;

  useEffect(() => {
    //silinecek
    const interval = setInterval(() => {
      selectRandomQuote(quotesList);
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [quotesList]);

  return {
    currentQuote: currentQuoteIndex !== null ? quotesList[currentQuoteIndex].quote : "",
    secondQuote: currentQuoteIndex !== null ? quotesList[currentQuoteIndex].quote2 : "",
  };
};

export default useQuotes;
