import { Snackbar } from '@react-native-material/core';
import React from 'react';
import { View } from 'react-native';
import { Snack } from './types';
import { SnackBarWrapper } from './SnackBarWrapper';

export const SnackBarContainer: React.FC<{ snacks: Snack[] }> = ({
    snacks,
}) => {
    return (
        <View>
            {snacks.map((snack: Snack) => (
                <SnackBarWrapper key={snack.id} snack={snack} />
            ))}
        </View>
    );
};
