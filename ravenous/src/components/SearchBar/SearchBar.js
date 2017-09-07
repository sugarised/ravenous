import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props)
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch= this.handleSearch.bind(this);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    };
    this.sortByOptions = {
      "Best Match" : "best_match",
      "Highest Rated" : "rating",
      "Most Reviewed" : "review_count"
    };
  }

  renderSortByOptions(){
    return Object.keys(sortByOptions).map(
      sortByOption => {
        let sortByOptionValue = sortByOptions[sortByOption];
        return <li className={getSortClass(sortByOptionValue)} key="{sortByOptionValue}" onClick={handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>
      });
  }
  getSortClass(sortByOption){
    if(this.state.sortBy === sortByOption){
      return 'active';
    } else {
      return '';
    }
  }
  handleSortByChange(sortByOption){
    this.setState({sortBy: sortByOption});
  }

  handleTermChange(event) {
    this.setState({
      term: event.target.value
    });
  }
  handleLocationChange(event) {
    this.setState({
      location: event.target.value
    });
  }
  handleSearch(event){
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy)
    event.preventDefault();
  }

  render(){
    return(
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            this.renderSortByOptions()
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input placeholder="Search Businesses" onChange={handleTermChange.bind(this)}/>
          <input placeholder="Where?" onChange={handleLocationChange.bind(this)}/>
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearch}>Lets Go</a>
        </div>
      </div>
    )
  }
}

export default SearchBar;
