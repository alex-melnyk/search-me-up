import React, {Component} from 'react';
import {FlatList, StatusBar, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import {Colors} from "../constants";

import {Poster, SearchField, TabView} from "./common";
import {apiGateway, NOW_PLAYING, POPULAR, TOP_RATED} from "../network";
import {chunk} from "../utils";

const REQUESTS = [NOW_PLAYING, POPULAR, TOP_RATED];

StatusBar.setBarStyle('light-content', true);

class App extends Component {
    state = {
        movies: [],
        loading: false,
        search: '',
        results: [],
        selectedTab: 0
    };

    requestMovies = () => {
        this.setState({
            loading: true,
            movies: []
        });

        apiGateway.get(REQUESTS[this.state.selectedTab])
            .then(({data: {results}}) => {
                this.setState({
                    movies: results,
                    loading: false
                });
            });
    };

    tabChanged = (selectedTab) => {
        this.setState({selectedTab}, this.requestMovies);
    };

    foundItemPressed = (item) => {
        this.setState({
            search: item.title
        });
    };

    searchProvoked = (search) => {
        const {
            movies
        } = this.state;

        const results = movies.filter((item) => search && item.original_title.toLowerCase().indexOf(search.toLowerCase()) >= 0)
            .map((movie) => ({
                id: movie.id,
                title: movie.original_title
            }));

        this.setState({
            search,
            results
        });
    };

    refreshProvoked = () => {
        this.requestMovies();
    };

    renderPoster = ({item, index}) => (
        <View style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
        }}>
            {
                item.map((subItem, idx) => (
                    <Poster
                        key={`sub_item_${idx}`}
                        style={{
                            marginLeft: idx ? 20 : 0
                        }}
                        title={subItem.original_title}
                        poster={subItem.poster_path}
                    />
                ))
            }
        </View>
    );

    componentDidMount() {
        this.requestMovies();
    }

    render() {
        const {
            loading,
            search,
            results,
            selectedTab
        } = this.state;

        const chunks = chunk(this.state.movies, 2);

        return (
            <SafeAreaView
                style={styles.container}
                forceInset={{bottom: 'never'}}
            >
                <TabView
                    tabs={[
                        {text: 'Now Playing', icon: 'movie-roll'},
                        {text: 'Popular', icon: 'movie'},
                        {text: 'Top Rated', icon: 'star'},
                    ]}
                    selected={selectedTab}
                    onTabChange={this.tabChanged}
                />
                <SearchField
                    value={search}
                    results={results}
                    onChangeText={this.searchProvoked}
                    onItemPress={this.foundItemPressed}
                />
                <FlatList
                    keyExtractor={(item, index) => `item_${index}`}
                    data={chunks}
                    renderItem={this.renderPoster}
                    refreshing={loading}
                    scrollEventThrottle={8}
                    onRefresh={this.refreshProvoked}
                />
            </SafeAreaView>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: Colors.eerieBlack,
    }
};

export {App};