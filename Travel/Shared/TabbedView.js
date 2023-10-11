import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const initialLayout = { width: Dimensions.get('window').width };

const DescriptionTab = () => (
    <View style={[styles.scene, { backgroundColor: 'white' }]}>
        <Text>Description Content</Text>
    </View>
);

const ReviewTab = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
        <Text>Review Content</Text>
    </View>
);

const MapsTab = () => (
    <View style={[styles.scene, { backgroundColor: '#ff6f61' }]}>
        <Text>Maps Content</Text>
    </View>
);

const renderTabBar = (props) => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: 'red' }}
    />
);

const TabbedView = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'description', title: 'Description' },
        { key: 'review', title: 'Review' },
        { key: 'maps', title: 'Maps' },
    ]);

    const renderScene = SceneMap({
        description: DescriptionTab,
        review: ReviewTab,
        maps: MapsTab,
    });

    console.log(setIndex)

    return (
        <View style={{ flex: 1 }}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TabbedView;
