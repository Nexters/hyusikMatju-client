import DotIcon from '#/assets/icons/dot.svg?react';
import { RestAreaInformation } from '#/features/rest-area/rest-area-information';

import { TabHeader } from './components/tab-header';
import { Text } from './components/text/Text';
import { theme } from './styles/theme';

const restInformation = {
    title: '천안 삼거리 휴게소',
    direction: '서울',
    isWorking: true,
    endTime: '24:00',
    ranking: 4.2,
};

const tabTitles = [
    { title: '먹거리', url: '/rest-area/foods' },
    {
        title: (
            <>
                주유 <DotIcon /> 주차
            </>
        ),
        url: '/rest-area/fuel-parking',
    },
    { title: '기타정보', url: '/rest-area/other-information' },
];

function App() {
    return (
        <div style={{ height: '100dvh' }}>
            <TabHeader
                headerInformation={restInformation}
                tabTitles={tabTitles}
            />
            <div style={{ height: '200dvh', overflow: 'scroll' }}>hih</div>

            {/* <Text
                as="h1"
                color={theme.color.main[100]}
                typography="headingBold20"
            >
                테스트 메세지
            </Text>
            <RestAreaInformation
                restAreaName="서울만남의광장"
                direction="부산"
                naverRating={4.1}
                gasolinePrice={1600}
                dieselPrice={1100}
                menuAmount={17}
                openDate={new Date('2024-08-07')}
                closeDate={new Date('2024-08-08')}
            /> */}
        </div>
    );
}

export default App;
