import React, { createContext, useContext, useReducer } from 'react';

type MaintenanceDraft = {
  ship?: string;
  isDIY?: boolean;
  maintenanceType?: 'Preventivo' | 'Correctivo';
  maintenanceDueDate?: string;
  failureDescription?: string;
  systemAffected?: string;
  recordTime?: string;
  hoursMeter?: number;
  executedBy?: string;
  invoiceNumber?: string;
  descriptionActivity?: string;
  statusBefore?: string;
  statusAfter?: string;
  timeSpentHours?: number;
  materialsUsed?: string[];
  partsCost?: number;
  partsInstalledSerial?: string[];
  protocolID?: string;
  // evidenceSequence/attachments luego
};

type State = {
  draft: MaintenanceDraft;
};

type Action =
  | { type: 'SET_FIELD'; field: keyof MaintenanceDraft; value: any }
  | { type: 'SET_MANY'; payload: Partial<MaintenanceDraft> }
  | { type: 'RESET' };

const initialState: State = {
  draft: {},
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        draft: { ...state.draft, [action.field]: action.value },
      };
    case 'SET_MANY':
      return { ...state, draft: { ...state.draft, ...action.payload } };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const Ctx = createContext<{
  state: State;
  setField: (field: keyof MaintenanceDraft, value: any) => void;
  setMany: (payload: Partial<MaintenanceDraft>) => void;
  reset: () => void;
} | null>(null);

export function MaintenanceFlowProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setField = (field: keyof MaintenanceDraft, value: any) =>
    dispatch({ type: 'SET_FIELD', field, value });

  const setMany = (payload: Partial<MaintenanceDraft>) =>
    dispatch({ type: 'SET_MANY', payload });

  const reset = () => dispatch({ type: 'RESET' });

  return (
    <Ctx.Provider value={{ state, setField, setMany, reset }}>
      {children}
    </Ctx.Provider>
  );
}

export function useMaintenanceFlow() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error(
      'useMaintenanceFlow must be used inside MaintenanceFlowProvider',
    );
  return ctx;
}
