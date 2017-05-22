import React, { Component } from 'react';
import { CardSection } from './common';
import { 
    Text, 
    TouchableWithoutFeedback, 
    View,
    LayoutAnimation,
    Platform } from 'react-native';
import * as actions from '../actions';
import { connect } from 'react-redux';

class ListItem extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    renderDescription() {
        const { library: { description }, expanded } = this.props;

        if(expanded) {
            return (
                <CardSection>
                    <Text style={{ flex: 1 }}>{description}</Text>
                </CardSection>
                
            );
        }
    }

    render(){
        const { titleStyle } = styles;
        const { id, title } = this.props.library;
        

        return(
            <TouchableWithoutFeedback 
                onPress={() => this.props.selectLibrary(id)}
            >
                <View>
                    <CardSection>
                        <Text style={titleStyle}>
                            {title}
                        </Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

const mapStateToProps = (state, ownProps) => {
    const expanded = state.selectedLibraryId === ownProps.library.id;

    return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);