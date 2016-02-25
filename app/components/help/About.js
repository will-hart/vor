import React from 'react';

class About extends React.Component {
  render() {
    return (
      <div>
        <h3 className="title is-3">What is Vor?</h3>
        <p className="content">
          <strong>Vor</strong> is a desktop text editor designed for writing both prose or scientific text.
          It uses modern open source technology and is itself open source. Vor supports a variety of features
          such as inline mathematics and Bibtex citations.
        </p>

        <p>
          Vor stores its documents in the Markdown document format, however you don't need to know any Markdown
          to use Vor. Documents can be exported to a number of different formats supported by the <code>Pandoc</code>
          utility.
        </p>

        <h3 className="title is-3">Why another text editor?</h3>
        <p className="content">
          <strong>Vor</strong> is a desktop text editor designed for writing both prose or scientific text.
          It uses modern open source technology and is itself open source. Vor supports a variety of features
          such as inline mathematics and Bibtex citations. It can export to a number of different formats supported
          by the <code>Pandoc</code> utility.
        </p>

        <h3 className="title is-3">Why Vor?</h3>
        <p className="content">
          Depending on who you believe, Vor is either a lesser known Norse goddess, known for her wisdom or a social
          class in Lois McMaster Bujold's fantastic Miles Vorkosigan science fiction series. Either way it should
          be easy to remember and even easier to spell!
        </p>
      </div>
    );
  }
}

export default About;
