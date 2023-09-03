import { store } from '../../store';
import { Appbar, Avatar, Badge, Card, Text } from 'react-native-paper';
import { Fragment } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigate } from 'react-router-native';

export const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Fragment>
            <Appbar.Header>
                <Appbar.Content
                    title={`Hello ${store.getRawState().user.firstName}!`}
                />
                <Appbar.Action icon="magnify" onPress={() => {}} />
            </Appbar.Header>
            <ScrollView
                contentContainerStyle={{ padding: 5 }}
                alwaysBounceVertical={true}>
                {Array.from(Array(4).keys()).map(_ => (
                    <View key={_}>
                        <Card
                            mode="elevated"
                            style={{ margin: 5 }}
                            onPress={() => {navigate(`/meal/${1}`)}}>
                            <Card.Title
                                title="Most Recent Meal"
                                titleVariant="titleLarge"
                                left={(props) => <Avatar.Icon {...props} icon="food" />}
                                right={() => <Badge />}
                                rightStyle={{ margin: 10 }}
                            />
                            <Card.Cover
                                source={{ uri: 'https://picsum.photos/900' }}
                                style={{ marginBottom: 5 }}
                            />
                            <Card.Content>
                                <Text variant="titleLarge">Rice and Beans</Text>
                                <Text variant="bodyMedium">
                                    {new Date().toLocaleString()}
                                </Text>
                            </Card.Content>
                        </Card>
                    </View>
                ))}
            </ScrollView>
        </Fragment>
    );
};
