import styled from "styled-components";

export const SectionCard = styled.section`
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  background: var(--surface);
  padding: 24px;
  margin-bottom: 24px;

  @media (max-width: 580px) {
    padding: 16px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px dashed var(--border);
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

export const UploadGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--surface-alt);
  border-radius: 12px;
  padding: 16px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--mist);
    font-size: 0.85rem;
    font-weight: 500;

    span {
      color: #ff7070;
    }

    span.value {
      margin-left: auto;
      color: var(--lime);
      font-family: var(--font-mono);
      font-size: 0.75rem;
    }
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    input {
      width: 100%;
      padding: 12px 14px;
      background: var(--surface-alt);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--foreground);
      font-size: 0.95rem;
      font-family: var(--font-mono);
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: var(--mist);
      }

      &::placeholder {
        color: var(--mist);
        opacity: 0.5;
      }
    }

    svg {
      position: absolute;
      right: 12px;
    }
  }
`;

export const UploadZone = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--surface-hover);
  border: 1px dashed var(--border);
  border-radius: 8px;
  padding: 12px 16px;

  @media (max-width: 475px) {
    flex-wrap: wrap;
    gap: 12px;
  }

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: var(--surface-hover);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
      color: var(--mist);
    }
  }
`;

export const FileDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;

  @media (max-width: 475px) {
    flex: 1 1 calc(100% - 56px);
  }

  span.name {
    color: var(--foreground);
    font-size: 0.85rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span.size {
    color: var(--mist);
    font-size: 0.75rem;
    font-family: var(--font-mono);
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 475px) {
    width: 100%;
    margin-top: 4px;
    gap: 8px;

    button {
      flex: 1;
      min-width: 100px;
      justify-content: center;
      text-align: center;
    }
  }
`;

export const ReplaceButton = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--mist);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--surface-hover);
    color: var(--foreground);
  }
`;

export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  border: none;
  color: var(--ink);
  background: var(--lime);
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
  margin: 12px 0 0;
  color: #ff7070;
  font-size: 0.85rem;
`;
