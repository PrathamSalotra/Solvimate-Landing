import styled from "styled-components";

export const SectionCard = styled.section`
  border: 1px solid rgba(255, 255, 255, 0.05);
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

export const UploadGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: rgba(0, 0, 0, 0.15);
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
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: var(--foreground);
      font-size: 0.95rem;
      font-family: var(--font-mono);
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: rgba(255, 255, 255, 0.3);
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.2);
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
  background: rgba(255, 255, 255, 0.03);
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 12px 16px;

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
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
`;

export const ReplaceButton = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--mist);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
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
