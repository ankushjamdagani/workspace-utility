import React from 'react';
import GitContent from '../sections/GitContent';

import '../../styles/views/pageContainer.scss';

class PageContainer extends React.Component{
  constructor( props ){
    super(props)

    this.toggleGitPanel = this.toggleGitPanel.bind(this)
    // https://picsum.photos/id/982/1440/822?grayscale
    this.state = {
      quickLinks: [
        {
          displayText: 'Jenkins: Mistri: Oleo',
          link: 'http://j.oleo.io/job/oleo-mistri-deploy/build?delay=0sec'
        },
        {
          displayText: 'Jenkins: Mistri: Stark',
          link: 'http://j.oleo.io/job/oleo-mistri-deploy/build?delay=0sec'
        },
        {
          displayText: 'Jenkins: Caroobi: Oleo',
          link: 'http://j.oleo.io/job/oleo-mistri-deploy/build?delay=0sec'
        },
        {
          displayText: 'Jenkins: Caroobi: Stark',
          link: 'http://j.oleo.io/job/oleo-mistri-deploy/build?delay=0sec'
        },
      ],
      profileDetails: {
        name: 'Ankush',
        email: 'ankush.jamdagani@caroobi.com',
        github: 'ankushjamdagani',
        linkedin: 'ankushjamdagani',
      },
      showGitPanel: false
    }
  }

  componentWillMount(){
  }

  toggleGitPanel(){
    this.setState({
      showGitPanel: !this.state.showGitPanel
    })
  }

  render(){
    return (
      <div className="app-page-container">
        <div className="hide actions-container">
          <div className="action-item toggle-git"
              onClick={this.toggleGitPanel}
          >
            <i className="fab fa-github-alt"></i>
          </div>
        </div>
        <div className="hide header-container __ff-mono__fs-xl__fw-b__">Hi {this.state.profileDetails.name}</div>
        <div className={"hide git-container " + (this.state.showGitPanel ? 'active' : '')}>
          <div className="overlay-container"></div>
          <div className="content-container">
            <GitContent
              userName={this.state.profileDetails.github}
              expanded={false}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default PageContainer;
