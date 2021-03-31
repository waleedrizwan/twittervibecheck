import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        TweetScope.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

const About = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h3" component="h1" gutterBottom>
          About Sentiment Analysis
        </Typography>
        <Typography variant="body1" component="h2" gutterBottom>
          <div>
            <p1>
              Sentiment Analysis, or Opinion Mining, is a sub-field of Natural
              Language Processing (NLP) that tries to identify and extract
              opinions within a given text. The aim of sentiment analysis is to
              gauge the attitude, sentiments, evaluations, attitudes and
              emotions of a speaker/writer based on the computational treatment
              of subjectivity in a text This project uses the{" "}
              <a color="blue">
                <strong> vaderSentiment </strong>
              </a>{" "}
              Python package,
              <a href="https://github.com/cjhutto/vaderSentiment">
                <strong> Github Repo found here</strong>
              </a>
              , to analyze text.{" "}
              <strong> VADER (Valence Aware Dictionary</strong> and sentiment
              Reasoner) is a lexicon and rule-based sentiment analysis tool that
              is specifically attuned to sentiments expressed in social media.
              <strong> VADER </strong> uses a combination of A sentiment lexicon
              is a list of lexical features (e.g., words) which are generally
              labelled according to their semantic orientation as either
              positive or negative. <strong> VADER </strong> has been found to
              be quite successful when dealing with social media texts, NY Times
              editorials, movie reviews, and product reviews. This is because{" "}
              <strong> VADER </strong> not only tells about the Positivity and
              Negativity score but also tells us about how positive or negative
              a sentiment is.
              <br />
              <br />
              <strong> VADER </strong> performs very well with emojis, slangs,
              and acronyms in sentences
              <br />
              <br />
              {/* <img src="https://miro.medium.com/max/512/1*rZZGKj3tYbxInh_0k31Ttg.png"></img> */}
              {/* <br />
              <br /> */}
              <a>
                <strong>The Compound Score</strong> is a metric that calculates
                the sum of all the lexicon ratings which have been normalized
                between -1 (most extreme negative) and +1 (most extreme
                positive).
              </a>
              <br />
              <br />
              <br />
              <div style={{ textAlign: "center" }}>
                <strong>
                  <a>{"Positive Sentiment Compound Score >= 0.05 "}</a>
                  <br />
                  <a>{"Neutral Sentiment -0.05 < Compound Score < 0.05"}</a>
                  <br />
                  <a>{"Positive Sentiment Compound Score >= 0.05"}</a>
                  <br />
                </strong>
              </div>
              {}
            </p1>
          </div>
        </Typography>
        <br />
        <br />
        <Typography variant="h4" component="h1" gutterBottom>
          Why is sentiment analysis so important?
        </Typography>
        <Typography variant="body1" component="h3" gutterBottom>
          Businesses today are heavily dependent on data. Majority of this data
          however, is unstructured text coming from sources like emails, chats,
          social media, surveys, articles, and documents. The micro-blogging
          content coming from Twitter and Facebook poses serious challenges, not
          only because of the amount of data involved, but also because of the
          kind of language used in them to express sentiments, i.e., short
          forms, memes and emoticons. Sifting through huge volumes of this text
          data is difficult as well as time-consuming. Also, it requires a great
          deal of expertise and resources to analyze all of that. Not an easy
          task, in short. Sentiment Analysis is also useful for practitioners
          and researchers, especially in fields like sociology, marketing,
          advertising, psychology, economics, and political science, which rely
          a lot on human-computer interaction data. Sentiment Analysis enables
          companies to make sense out of data by being able to automate this
          entire process! Thus they are able to elicit vital insights from a
          vast unstructured dataset without having to manually indulge with it
        </Typography>

        <br />
        <Typography variant="h3" component="h1" gutterBottom>
          About This Project
        </Typography>

        <Typography variant="body1" component="h2" gutterBottom>
          This project was created to conduct sentiment analysis using tweets of
          individuals as well as tweets regarding a specific subject. I believe
          that Twitter is a valuable source of information regarding emotion,
          opinions and it gives us an up to date mental status of the world.
          Given that Twitter has millions of users of all backgrounds, it is the
          perfect resource for real-time global sentiment analysis.
          <a href="https://github.com/waleedrizwan/twittervibecheck">
            {" "}
            To contribute fork the repo and make a pull request on the repo
            found here.{" "}
          </a>
          Feel free to send me any suggestions.
        </Typography>
      </Container>
      {/* <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">About</Typography>
          <Copyright />
        </Container>
      </footer> */}
    </div>
  );
};

export default About;
