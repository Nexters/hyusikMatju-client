import { useState } from 'react';

import ArrowSwitchHorizontalIcon from '#/assets/icons/arrow-switch-horizontal.svg?react';
import DestinationIcon from '#/assets/icons/destination.svg?react';
import OriginIcon from '#/assets/icons/origin.svg?react';
import { CTAButton } from '#/components/cta-button';
import { LocationSelectField } from '#/features/location/location-select-field';
import { Search } from '#/features/location/search';
import { SelectedLocationType } from '#/types/location';

import * as S from './LocationSearch.style';

const SEARCH_OPTION = {
    ORIGIN: 'origin',
    DESTINATION: 'destination',
};
type SearchOptionType = (typeof SEARCH_OPTION)[keyof typeof SEARCH_OPTION];

export function LocationSearch() {
    const [routeLocation, setRouteLocation] = useState<
        Record<SearchOptionType, SelectedLocationType | null>
    >({
        origin: null,
        destination: null,
    });
    const [searchType, setSearchType] = useState<SearchOptionType | null>(null);

    const isSelectedOrigin = !!routeLocation.origin;
    const isSelectedDestination = !!routeLocation.destination;
    const isSelectEnd = isSelectedOrigin && isSelectedDestination;

    const handleClickLabel = (searchType: SearchOptionType) => {
        setSearchType(searchType);
    };

    const handleSelectLocation = (location: SelectedLocationType) => {
        if (!searchType) {
            return;
        }

        setRouteLocation({ ...routeLocation, [searchType]: location });
        setSearchType(null);
    };

    const handleCancelSelect = () => {
        setSearchType(null);
    };

    const handleSwitchLocation = () => {
        if (!isSelectEnd) {
            return;
        }

        const origin = {
            ...routeLocation.origin,
        } as SelectedLocationType;
        const destination = {
            ...routeLocation.destination,
        } as SelectedLocationType;

        setRouteLocation({ origin: destination, destination: origin });
    };

    const handleClickSearch = () => {
        // TODO: 검색 결과 페이지로 이동
    };

    return (
        <>
            {searchType !== null ? (
                <Search
                    onSelect={handleSelectLocation}
                    onClose={handleCancelSelect}
                />
            ) : (
                <S.Container>
                    <img src="" style={{ width: '100%', height: '327px' }} />

                    <S.Contents>
                        <S.Title>
                            쥬쥬와 함께
                            <br />
                            휴게소 맛집을 찾아보세요!
                        </S.Title>

                        <S.RouteContainer>
                            <S.RouteIconContainer>
                                <OriginIcon />
                                <S.DottedLine />
                                <DestinationIcon />
                            </S.RouteIconContainer>

                            <S.Location>
                                <LocationSelectField
                                    handleClick={() =>
                                        handleClickLabel(SEARCH_OPTION.ORIGIN)
                                    }
                                    label="출발지 입력"
                                    placeholder="출발지를 선택해주세요"
                                    isSelected={isSelectedOrigin}
                                    locationName={
                                        routeLocation.origin?.addressName
                                    }
                                />

                                <S.BorderLine />

                                <LocationSelectField
                                    handleClick={() =>
                                        handleClickLabel(
                                            SEARCH_OPTION.DESTINATION,
                                        )
                                    }
                                    label="도착지 입력"
                                    placeholder="도착지를 선택해주세요"
                                    isSelected={isSelectedDestination}
                                    locationName={
                                        routeLocation.destination?.addressName
                                    }
                                />
                            </S.Location>

                            <button onClick={handleSwitchLocation}>
                                <ArrowSwitchHorizontalIcon
                                    stroke={isSelectEnd ? '#FF7512' : '#FFD6B8'}
                                />
                            </button>
                        </S.RouteContainer>

                        <CTAButton
                            isValid={isSelectEnd}
                            onClick={handleClickSearch}
                        >
                            검색
                        </CTAButton>
                    </S.Contents>
                </S.Container>
            )}
        </>
    );
}
