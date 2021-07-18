import { interpret, Machine, MachineConfig } from 'xstate';
import { initialContext } from './context';
import { options } from './options';
import { transitions } from './transitions';
import { Context, Schema, Transition } from './types';

const config: MachineConfig<Context, Schema, Transition> = {
  id: 'root',
  initial: 'idle',
  context: initialContext,
  states: {
    idle: {
      on: transitions,
    },
  },
};

const machine = Machine<Context, Schema, Transition>(config, options);

export const service = interpret(machine);

// start the interpreted machine
service.start();
