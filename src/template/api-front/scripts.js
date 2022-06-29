import ModalManager from '@modules/ModalManager/ModalManager.js';

const modulesVarsMap = {
  modal: () => 'spiksModalManager',
};

const modulesMap = {
  modal: () => new ModalManager(),
};

const initModules = (modulesNamesList = []) => {
  const registeredModulesNames = [];

  modulesNamesList.forEach((moduleName) => {
    const moduleVarName = modulesVarsMap[moduleName];
    const moduleInitMethod = modulesMap[moduleName];

    if (!moduleVarName || !moduleInitMethod) {
      throw new Error(`[${moduleName}] module is not defined`);
    }

    window[moduleVarName()] = moduleInitMethod();

    registeredModulesNames.push({
      name: moduleName,
      varName: moduleVarName(),
    });
  });

  registeredModulesNames
    .map(({ name, varName }) => `[${name}]: window.${varName}`)
    .forEach((modalLog, index) => {
      if (index === 0) {
        console.log('%cRegistered modules list:', 'color: #314ed1; font-weight: 900;');
      }
      console.log(`%c${modalLog}`, 'color: #314ed1');
    });
};

export default initModules;
