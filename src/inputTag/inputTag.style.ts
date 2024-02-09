import styled, { css } from 'styled-components';
import type { ThemeStyledProps } from '@/styles/themes';

export default styled('div')<ThemeStyledProps>(({ theme }) => {
  return css`
    .container {
      .info-input-ctr {
        display: flex;
        align-items: center;
        label {
          color: ${theme.text.low.value};
          font-weight: 600;
          font-size: 14px;
          line-height: 190%;
          margin-inline-end: 10px;
        }
        .icon {
          width: 18px;
          height: 18px;
        }
      }

      .tags-input-container {
        transition: all 0.2s ease-in-out;
        padding: 4px 10px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5em;
        border-radius: 6px;
        border: 1px solid ${theme.border.mid.value};
        background: ${theme.bg.g2.value};

        &.error {
          border: 1px solid #ff4d4f;
        }
        &.disabled {
          background-color: rgba(0, 0, 0, 0.04);
        }
        .add-btn {
          all: unset;
          cursor: pointer;
          font-size: 14px;
          font-weight: 700;
          color: ${theme.theme.primary[600].value};
          &:disabled {
            color: ${theme.text.low.value};
          }
        }
      }

      .tag-item {
        display: flex;
        align-items: center;
        border-radius: 100px;
        border: 0.8px solid ${theme.theme.info[20].value};
        background: ${theme.theme.info[10].value};
        color: ${theme.theme.info[800].value};
        font-size: 13px;
        font-style: normal;
        font-weight: 600;
        height: 24px;
        padding: 0px 5px 0 12px;

        .text {
          height: 18px;
        }
      }
      .tag-item .close {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin-left: 0.5em;
        cursor: pointer;
        .icon {
          width: 19px;
          height: 18px;
          svg g path {
            fill: ${theme.theme.info[800].value};
          }
        }
      }

      .tags-input {
        flex-grow: 1;
        /* padding: 0.5em 0; */
        border: none;
        outline: none;
        background-color: unset;
        color: ${theme.natural['50'].value};
        font-weight: 600;
        &:hover:enabled {
          color: ${theme.text.high.value};
        }
        &::placeholder {
          color: ${theme.natural['50'].value};
          font-weight: 400;
          font-family: var(--yekan-font);
        }
      }

      .error-msg {
        color: ${theme.theme.error['600'].value};
        font-size: 12px;
        font-weight: 600;
      }

      /* SIZES */

      &.middle {
        .tags-input-container {
          min-height: 42px;
        }
      }
      &.large {
      }
      &.small {
      }
    }
  `;
});
