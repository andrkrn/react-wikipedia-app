var WikipediaSearchResult = React.createClass({
  render: function() {
    var url = "https://wikipedia.org/wiki/" + this.props.result.title;
    return (
    <a href={url} className="result">
      <h4>{this.props.result.title}</h4>
      <p>{this.props.result.extract}</p>
    </a>
    );
  }
});

var WikipediaSearchResults = React.createClass({
  render: function() {
    var results = Object.keys(this.props.results).sort(function(a, b) {
      return -(this.props.results[b].index - this.props.results[a].index);
    }.bind(this));
    var searchResults = results.map(function(result) {
      var result = this.props.results[result];
      return (
        <WikipediaSearchResult key={result.pageid} result={result} />
      );
    }.bind(this));
    var loading = (this.props.loading) ? <img src="images/ring-alt.gif" alt="loading" className="text-center loading" /> : '';
    return (
      <div className="results">
        {loading}
        {searchResults}
      </div>
    )
  }
});

var WikipediaSearch = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var input = this.refs.searchText;
    this.props.handleSearch(input.value);
  },
  render: function() {
    return (
    <div className="wikipedia-search">
      <form onSubmit={this.handleSubmit} className="wikipedia-form">
        <input type="text" ref="searchText" required="required" />
        <input type="submit" value="Search" />
        <a href="http://en.wikipedia.org/wiki/Special:Random" className="button success mar-left-10">I am Lucky Bastard!</a>
      </form>
    </div>
    );
  }
});

var WikipediaApp = React.createClass({
  getInitialState: function() {
    return {results: {}, loading: false}
  },
  handleSearch: function(value) {
    var api = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&format=json&exsentences=1&exlimit=max&exintro=&explaintext=&pilimit=max&generator=search&gsrnamespace=0&piprop=original&callback=?&gsrsearch="
    this.setState({loading: true});
    $.ajax({
      url: api + value,
      dataType: 'json',
      type: 'GET',
      success: function(data, textStatus, jqXHR) {
        var results = (typeof data.query === 'undefined') ? {} : data.query.pages;
        this.setState({results: results, loading: false});
      }.bind(this)
    });
  },

  render: function() {
    return (
    <div className="wikipedia-app">
      <h1 className="text-center">Wikipedia App</h1>
      <WikipediaSearch handleSearch={this.handleSearch} />
      <WikipediaSearchResults results={this.state.results} loading={this.state.loading} />
      <p className="copyright text-center">
        Andri Kurnia (<a href="https://github.com/andrkrn">@andrkrn</a>)
      </p>
    </div>
    );
  }
});

ReactDOM.render(
  <WikipediaApp />,
  document.getElementById('app')
);
