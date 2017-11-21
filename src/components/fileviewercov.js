/* This file contains coverage information for a particular revision of a source file */
import React, { Component } from 'react';

import * as Color from '../utils/color';

const _ = require('lodash');

/* Sidebar component, show which tests will cover the given selected line */
export const TestsSideViewer = ({ coverage, lineNumber }) => {
  let content;
  console.log(coverage.testsPerHitLine);

  if (!coverage) {
    content = <h3>Fetching coverage from backend...</h3>;
  } else if (!lineNumber) {
    content = (
      <div>
        <h3>All test that cover this file</h3>
        <ul className="test-viewer-ul">
          {
            coverage.allTests.map(test =>
              (<Test
                key={test.run.key}
                test={test}
              />),
            )
          }
        </ul>
      </div>
    );
  } else if (coverage.testsPerHitLine[lineNumber]) {
    content = (
      <div>
        <h3>Line: {lineNumber}</h3>
        <ul className="test-viewer-ul">
          {
            coverage.testsPerHitLine[lineNumber].map(test =>
              (<Test
                key={test.run.key}
                test={test}
              />),
            )
          }
        </ul>
      </div>
    );
  } else {
    content = (
      <div>
        <h3>Line: {lineNumber}</h3>
        <p>No test covers this line</p>
      </div>
    );
  }
  return (
    <div className="tests_viewer">
      <div className="tests-viewer-title">Covered Tests</div>
      {content}
    </div>
  );
};

/* Test list item in the TestsSideViewer */
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = { height: '0px', ptrRotate: 0 };
    this.handleTestOnClick = this.handleTestOnClick.bind(this);
  }

  handleTestOnClick() {
    this.setState({
      height: (this.state.height === '0px') ? '60px' : '0px',
      ptrRotate: (this.state.ptrRotate === 0) ? 90 : 0,
    });
  }

  render() {
    const test = this.props.test;
    return (
      <li>
        <div className="toggleable-test-title" onClick={this.handleTestOnClick}>
          <span className="test-ptr" style={{ transform: `rotate(${this.state.ptrRotate}deg)` }}>&#x2023;</span>
          <label className="test-name">
            {test.run.name.length > 40 ? `${test.run.name.slice(0, 38)}...` : test.run.name}
          </label>
        </div>
        <div className="expand-test-info" style={{ height: this.state.height }}>
          <ul className="test-detail-ul">
            <li><span>run-platform : </span>{test.run.machine.platform}</li>
            <li><span>suite-name : </span>{test.run.suite.fullname}</li>
            <li><span>run-chunk : </span>{test.run.chunk}</li>
          </ul>
        </div>
      </li>
    );
  }
}

/* shows coverage percentage of a file */
export const CoveragePercentageViewer = ({ coverage }) => {
  const percentageCovered = undefined;

  if (coverage) {
    const totalLines = coverage.uncoveredLines.length + coverage.coveredLines.length;

    if (coverage.coveredLines.length !== 0 || coverage.uncoveredLines.length !== 0) {
      this.percentageCovered = coverage.coveredLines.length / totalLines;
    } else {
      // this.percentageCovered is left undefined
    }
  }

  return (
    <div className="coverage_meta">
      <div className="coverage_meta_totals">
        {this.percentageCovered &&
          <span className="percentage_covered" style={{ backgroundColor: `${Color.getPercentCovColor(this.percentageCovered)}` }}>
            { (this.percentageCovered * 100).toPrecision(4) }%
          </span>
        }
      </div>
    </div>
  );
};
