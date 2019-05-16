import React from 'react';

import '../../styles/sections/gitContent.scss';

class GitContent extends React.Component{
  constructor( props ){
    super(props)

    this.state = {
      repos: [],
      activeRepo: null,
      branches: [],
      activeBranch: null,
      commits: [],
      activeCommit: null,
      userDetails: null,
      view: 'REPOS', // REPOS, BRANCHES, COMMITS
    }

    this.getUser = this.getUser.bind(this);
    this.getRepos = this.getRepos.bind(this);
    this.getRepoBranches = this.getRepoBranches.bind(this);
    this.getBranchCommits = this.getBranchCommits.bind(this);
  }

  componentWillMount(){
    this.getUser()
    this.getRepos()
  }

  getUser(){
    fetch('https://api.github.com/users/' + this.props.userName + '')
    .then(r => r.json())
    .then(r => this.setState({userDetails: r}))
  }

  getRepos(){
    fetch('https://api.github.com/users/' + this.props.userName + '/repos')
    .then(r => r.json())
    .then(r => this.setState({repos: r}))
  }

  getRepoBranches( repo ){
    fetch('https://api.github.com/repos/' + this.props.userName + '/' + repo.name + '/branches')
    .then(r => r.json())
    .then(r => this.setState({
      branches: r,
      activeRepo: repo
    }))
  }

  getBranchCommits( branch ){
    fetch('https://api.github.com/repos/' + this.props.userName + '/' + this.state.activeRepo.name + '/commits')
    .then(r => r.json())
    .then(r => this.setState({
      commits: r,
      activeBranch: branch
    }))
  }

  render(){
    return (
      <div className={"git-content-container " + (this.props.expanded ? '' : 'hide')}>
        { this.state.userDetails ? (
            <div className="profile-block">
              <div className="profile-pic">
                <img src={this.state.userDetails.avatar_url} />
              </div>
              <div className="profile-details">
                <div className="name-container">{this.state.userDetails.name}</div>
                <a
                  className="link-container"
                  href={this.state.userDetails.html_url}
                  target="_blank"
                >
                  <i className="fa fa-link"></i>
                </a>
              </div>
            </div>
          ) : (
            "Loading..."
          )
        }
        { this.state.repos && !this.state.activeRepo && (
            <ul className="list-container repo-list">
              { this.state.repos.map( repo => (
                  <div className="list-item repo-item"
                       onClick={() => this.getRepoBranches(repo)}
                       key={repo.name}
                  >
                    <div className="list-title repo-title">
                      <a href={repo.html_url}
                      target="_blank"
                      >
                        <i className="fa fa-link"></i>
                      </a>
                      {repo.name}
                    </div>
                    <div className="list-description repo-description">{repo.description}</div>
                  </div>
                )
              )}
            </ul>
          )
        }
        { this.state.branches && !this.state.activeBranch && (
            <ul className="list-container branch-list">
              { this.state.branches.map( branch => (
                  <div className="list-item branch-item"
                       onClick={() => this.getBranchCommits(branch)}
                       key={branch.name}
                  >
                    <div className="list-title branch-title">
                      <a href={branch.html_url}
                      target="_blank"
                      >
                        <i className="fa fa-link"></i>
                      </a>
                      {branch.name}
                    </div>
                    <div className="list-description branch-description">{branch.description}</div>
                  </div>
                )
              )}
            </ul>
          )
        }
        { this.state.commits && !this.state.activeCommit && (
            <ul className="list-container branch-list">
              { this.state.commits.map( commit => (
                  <div className="list-item commit-item"
                       onClick={() => this.getBranchCommits(commit)}
                       key={commit.sha}
                  >
                    <div className="list-title commit-title">
                      <a href={commit.html_url}
                      target="_blank"
                      >
                        <i className="fa fa-link"></i>
                      </a>
                      {commit.sha}
                    </div>
                    <div className="list-description commit-description">{commit.commit.message}</div>
                  </div>
                )
              )}
            </ul>
          )
        }
      </div>
    )
  }
}

export default GitContent;
