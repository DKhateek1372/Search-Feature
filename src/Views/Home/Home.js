import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Head from '../../Components/Head';
import { ContentPusher, Container, Readable } from '../../Components/Layout';
import styles from './Home.css';
const dataEn = require('./data-home-en.md');
const dataDe = require('./data-home-de.md');
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import { t } from '../../Components/Languages';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
import star from '../../assets/img/star.png';
import fork from '../../assets/img/fork.png';
import issue from '../../assets/img/issue.png';


class Home extends Component {
    constructor(props) {
		super(props);
		this.state = {
			searchval:'',
			userprofile : [],
			zeroresult:true,
			emptyinput:false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {}

		handleClick(){
			if(this.state.searchval == ''){
				this.setState({
					emptyinput:true
				   });
			}
			else if(this.state.searchval != '') {
				this.setState({
					emptyinput:false
				   });
				axios.get('https://api.github.com/search/repositories?', {
					params: {
					  q: this.state.searchval
					}
				  })
				  .then(function (response) {
				   this.setState({
					userprofile: response.data.items,
					zeroresult: false
				   });
				   this.state.userprofile.push(response.data.items);
				   console.log(this.state.userprofile);
				   }.bind(this))
				   .catch(function (error) {
					console.log(error);
				  });
			  }
			}	
		
		handleChange(evt)  {
			this.setState({
				searchval: evt.target.value
			});
			console.log(this.state.searchval)
		}

	render() {
		const { lang } = this.props.match.params;

		return (
			<div>
				<center>
					<div>
						React Vedantu Assignment
					</div>
					

					<div className={styles.searchfilter}>
						<div className={styles.searchfilterhead}>Git Repo Search Filter</div>
						<input type="text" placeholder="Please Search" className={styles.searchip} 
						value={this.state.searchval} onChange={this.handleChange}/>
						<button onClick={this.handleClick.bind(this)} className={styles.searchbtn}>Search Query</button>
						{this.state.emptyinput ? 
						<div className={styles.emptyinput}>Input Field Can't Be Empty</div>	 
							: null
					    }
					</div>


					<div className={styles.profile}>
                        <div className={styles.searchpro}>
						<div className={styles.heading}>Repo Search Result</div>

						{this.state.zeroresult ? 
						<div className={styles.zeroresult}>Zero Search Result</div>	 
							: null
					    }
						 {this.state.userprofile.map((items,index) =>
						 <div className={styles.userprofiles} key={index}>
						 <div className={styles.gitusers}>
						  <img src={items.owner.avatar_url} className={styles.userimg}/>
						    <div className={styles.username}>{items.name}</div>
							<div className={styles.threeinfo}>
								 <div className={styles.star}>
								 <img src={star} alt="star" className={styles.starimg}/>
								 stars{items.stargazers_count}</div>
								 <div className={styles.fork}>
								 <img src={fork} alt="fork" className={styles.starimg}/>
								 forks{items.forks}</div>
								 <div className={styles.issue}>
								 <img src={issue} alt="issue" className={styles.starimg}/>
								 issue{items.open_issues}</div>
							</div>
							<div className={styles.description}>
								 {items.description}
							</div>
							</div>
							<div className={styles.viewprofilebtn}>
                                 <button className={styles.profilebtn} key={index}>View profile</button>
							</div>
						</div>
						 )}
						</div>
					</div>

					</center>																																																																																																																																																																																																																																																																																																																																																																																																									
					
			</div>
		);
	}
}

export default Home;
