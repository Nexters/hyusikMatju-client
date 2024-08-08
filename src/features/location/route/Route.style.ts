import styled from '@emotion/styled';

import dottedLine from '#/assets/icons/dotted-line.svg';

export const Container = styled.div`
    padding-top: 64px;
`;

export const Contents = styled.div`
    padding: 0 20px;
    margin-top: 40px;
`;

export const Route = styled.div`
    flex: 1;
`;

export const BorderLine = styled.div<{ isFill: boolean }>`
    margin: 20px 0;
    border-top: ${({ isFill, theme }) =>
        `1px solid ${isFill ? theme.color.main[30] : theme.color.bg[100]}`};
`;

export const RouteContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    margin-top: 64px;
`;

export const RouteIconContainer = styled.div`
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
`;

export const DottedLine = styled.div`
    flex: 1;
    width: 2px;

    background-image: url(${dottedLine});
    background-repeat: repeat-y;
`;
