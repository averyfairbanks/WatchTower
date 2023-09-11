import { useTheme } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { BottomBar, LogMealButton, PaginatorArrow } from './styled';
import { PageDetails } from './types';

interface PaginatorProps {
  handlePageChange: (forward: boolean) => void;
  pageDetails: PageDetails;
}

export const Paginator: React.FC<PaginatorProps> = ({
  handlePageChange,
  pageDetails,
}) => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { hasBackward, hasForward } = pageDetails;

  return (
    <>
      <BottomBar
        style={{
          backgroundColor: colors.primary,
        }}>
        {hasBackward && (
          <PaginatorArrow
            icon="arrow-left"
            style={{ left: 10 }}
            onPress={() => handlePageChange(false)}
          />
        )}
        <LogMealButton
          label=""
          onPress={() => {
            navigate('/meal/create');
          }}
        />
        {hasForward && (
          <PaginatorArrow
            icon="arrow-right"
            style={{ right: 10 }}
            onPress={() => handlePageChange(true)}
          />
        )}
      </BottomBar>
    </>
  );
};
