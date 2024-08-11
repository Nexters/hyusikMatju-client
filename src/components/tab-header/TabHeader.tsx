import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import DotIcon from '#/assets/icons/dot.svg?react';
import StarIcon from '#/assets/icons/star.svg?react';
import { theme } from '#/styles/theme';

import { FlexBox } from '../flex-box';
import { Header } from '../header';
import { Text } from '../text';

import * as S from './TabHeader.style';

type TabTitleType = { title: ReactNode; url: string };

interface TabHeaderProps {
    headerInformation: {
        title: string;
        direction: string;
        isWorking: boolean;
        endTime: string;
        ranking: number;
    };
    tabTitles: TabTitleType[];
}

const TOTAL_HEADER_HEIGHT = 166;
const HEADER_CONTENTS_HEIGHT = 95;

export function TabHeader({ headerInformation, tabTitles }: TabHeaderProps) {
    const { restAreaId } = useParams();
    const navigate = useNavigate();

    const { title, direction, isWorking, endTime, ranking } = headerInformation;

    const [scrollHeight, setScrollHeight] = useState(0);

    const isMinSize = scrollHeight > 30;
    const headerTranslateY = isMinSize
        ? -HEADER_CONTENTS_HEIGHT
        : -scrollHeight;
    const headerHeight = TOTAL_HEADER_HEIGHT + headerTranslateY;

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) {
            return;
        }

        function handleScroll() {
            if (!contentRef.current) {
                return;
            }
            const scrollTop = contentRef.current.scrollTop;
            setScrollHeight(scrollTop);
        }

        contentRef.current.addEventListener('scroll', handleScroll);

        return () => {
            if (contentRef.current) {
                contentRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const headerTitle = useMemo(() => {
        return isMinSize ? (
            <FlexBox row gap={12} flexOption={{ alignItems: 'center' }}>
                <Text typography="headingBold18" color={theme.color.blk[100]}>
                    {title}
                </Text>
                <S.SplitLine />
                <Text typography="bodySemiBold18" color={theme.color.blk[40]}>
                    {direction} 방향
                </Text>
            </FlexBox>
        ) : (
            ''
        );
    }, [isMinSize, title, direction]);

    return (
        <S.Container>
            <Header title={headerTitle} isVisibleBackspace />

            <S.HeaderContents
                initial={{ height: headerHeight }}
                animate={{ translateY: headerTranslateY, height: headerHeight }}
                transition={{ duration: 0.2 }}
            >
                <FlexBox gap={16}>
                    <FlexBox row gap={12} flexOption={{ alignItems: 'center' }}>
                        <Text
                            typography="headingBold20"
                            color={theme.color.blk[100]}
                        >
                            {title}
                        </Text>
                        <S.SplitLine />
                        <Text
                            typography="headingSemiBold20"
                            color={theme.color.blk[40]}
                        >
                            {direction} 방향
                        </Text>
                    </FlexBox>

                    <FlexBox row gap={12}>
                        <Text
                            typography="bodySemiBold14"
                            color={theme.color.blk[60]}
                        >
                            식당 {isWorking ? '영업중' : '마감시간'} <DotIcon />{' '}
                            {endTime}
                            까지
                        </Text>
                        <S.RankingInformation>
                            <StarIcon width={12} height={12} />
                            <Text typography="bodyBold14">
                                {ranking} <DotIcon />
                            </Text>
                            <Text typography="bodySemiBold14">네이버평점</Text>
                        </S.RankingInformation>
                    </FlexBox>
                </FlexBox>
            </S.HeaderContents>

            <S.TabContainer>
                {tabTitles.map((tabTitle, idx) => {
                    const isSelected = tabTitle.url === restAreaId;
                    return (
                        <S.Tab key={idx}>
                            <S.TabTitle
                                typography={
                                    isSelected ? 'bodyBold16' : 'bodyMedium16'
                                }
                                color={
                                    isSelected
                                        ? theme.color.main[100]
                                        : theme.color.blk[40]
                                }
                                onClick={() => navigate(tabTitle.url)}
                            >
                                {tabTitle.title}
                            </S.TabTitle>
                            {isSelected && <S.SelectBorder />}
                        </S.Tab>
                    );
                })}
            </S.TabContainer>
        </S.Container>
    );
}
