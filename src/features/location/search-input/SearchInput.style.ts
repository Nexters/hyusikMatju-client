import styled from '@emotion/styled';

export const Container = styled.div<{
    isActive: boolean;
    isValid: boolean;
    isInvalid: boolean;
}>`
    box-sizing: border-box;
    width: 100%;
    padding: 12px 16px;
    display: inline-flex;
    align-items: center;
    gap: 6px;

    background-color: ${({ isActive, theme }) =>
        isActive ? theme.color.wht[100] : theme.color.blk[5]};
    border: ${({ isValid, isInvalid, theme }) =>
        `1px solid ${isInvalid ? theme.color.error[100] : isValid ? theme.color.select[100] : 'transparent'}`};
    border-radius: 16px;
`;

export const Input = styled.input`
    flex: 1;
    font-size: 16px;

    color: ${({ theme }) => theme.color.blk[100]};

    ::placeholder {
        color: ${({ theme }) => theme.color.blk[40]};
    }
`;
