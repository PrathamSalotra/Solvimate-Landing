import styled from "styled-components";

export const SectionCard = styled.section`
  border: 1px solid rgba(55, 251, 137, 0.2);
  border-radius: 16px;
  background: linear-gradient(170deg, rgba(1, 55, 51, 0.9), rgba(0, 30, 43, 0.95));
  padding: 24px;
  margin-bottom: 24px;

  @media (max-width: 580px) {
    padding: 16px;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0 0 8px;
  color: #ffffff;
  font-size: 1.1rem;
`;

export const SectionDescription = styled.p`
  margin: 0 0 20px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  line-height: 1.5;
`;

export const PreviewBlock = styled.div`
  margin-bottom: 24px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.25);
  border-left: 3px solid #37fb89;
  border-radius: 4px;

  p {
    margin: 0 0 4px;
    color: rgba(255, 255, 255, 0.75);
    font-size: 0.85rem;
  }

  code {
    color: #37fb89;
    font-size: 0.9rem;
    font-family: monospace;
  }
`;

export const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.label<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;

  ${(props) => props.$fullWidth && `grid-column: 1 / -1;`}

  span {
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.85rem;
    font-weight: 500;
  }

  input,
  textarea {
    padding: 10px 14px;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    color: #ffffff;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: rgba(55, 251, 137, 0.6);
      background: rgba(0, 0, 0, 0.4);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  }

  small {
    color: #ff7070;
    font-size: 0.75rem;
  }
`;

export const BadgeGroup = styled.fieldset`
  grid-column: 1 / -1;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 16px;
  margin: 0;

  legend {
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 8px;
  }
`;

export const BadgeOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
`;

export const BadgeOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  input[type="checkbox"] {
    cursor: pointer;
  }

  span {
    color: #ffffff;
    font-size: 0.85rem;
  }
`;

export const FormActions = styled.div`
  grid-column: 1 / -1;
  margin-top: 8px;
`;

export const PrimaryButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  color: #001e2b;
  background: linear-gradient(140deg, #37fb89, #00d672);
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.1s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  grid-column: 1 / -1;
  margin: 0;
  color: #ff7070;
  font-size: 0.85rem;
`;

export const SuccessText = styled.p`
  grid-column: 1 / -1;
  margin: 0;
  color: #37fb89;
  font-size: 0.85rem;
  font-weight: 500;
`;
