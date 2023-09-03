import { ScrollView, View } from 'react-native';
import { Avatar, Badge, Card, Text } from 'react-native-paper';
import { useNavigate } from 'react-router-native';

export const Meals: React.FC = () => {
    const navigate = useNavigate();

    return (
        <ScrollView
            contentContainerStyle={{ padding: 5 }}
            alwaysBounceVertical={true}>
            <View>
                <Card
                    mode="elevated"
                    style={{ margin: 5 }}
                    onPress={() => {
                        navigate(`/meal/${1}`);
                    }}>
                    <Card.Title
                        title="Most Recent Meal"
                        titleVariant="titleLarge"
                        left={props => <Avatar.Icon {...props} icon="food" />}
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
        </ScrollView>
    );
};
