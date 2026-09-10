import styled from "styled-components";

export const SectionCard = styled.section`
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  background: var(--surface);
  padding: 0; /* padding handled internally */
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
`;

export const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StepBadge = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--lime);
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  font-family: var(--font-mono);
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: var(--foreground);
  font-size: 1.2rem;
  font-weight: 600;
`;

export const FormGrid = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 16px;
  padding: 24px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.label<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${(props) => props.$fullWidth && `grid-column: 1 / -1;`}

  span {
    color: var(--mist);
    font-size: 0.85rem;
    font-weight: 500;

  }

  input,
  textarea {
    padding: 12px 14px;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: var(--foreground);
    font-size: 0.95rem;
    transition: all 0.2s ease;
    font-family: var(--font-body);

    &:focus {
      outline: none;
      border-color: rgba(255, 255, 255, 0.3);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.2);
    }
  }

  small {
    color: #ff7070;
    font-size: 0.75rem;
  }
`;

export const BadgeGroup = styled.fieldset`
  grid-column: 1 / -1;
  border: none;
  padding: 0;
  margin: 0;

  legend {
    color: var(--mist);
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 12px;
  }
`;

export const BadgeOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
`;

export const BadgeOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  input[type="checkbox"] {
    cursor: pointer;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    accent-color: var(--lime);
  }

  span {
    color: var(--foreground);
    font-size: 0.85rem;
  }
`;

export const FormActions = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 16px 24px;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 580px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const ProtocolLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--mist);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  svg {
    color: var(--lime);
  }
`;

export const PrimaryButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  color: var(--ink);
  background: var(--lime);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
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
