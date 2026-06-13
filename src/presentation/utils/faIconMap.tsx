import type { FC } from 'react';
import type { IconBaseProps } from 'react-icons';
import {
  FaCode, FaMobileAlt, FaInfinity, FaCloud, FaLightbulb, FaGraduationCap,
  FaPlug, FaShoppingCart, FaServer, FaCodeBranch, FaShieldAlt, FaDatabase,
  FaChalkboardTeacher, FaStore, FaProjectDiagram, FaUniversity, FaCity,
  FaCertificate,
} from 'react-icons/fa';

export type FaIconComponent = FC<IconBaseProps>;

export const faIconMap: Record<string, FaIconComponent> = {
  'fa-code':               FaCode,
  'fa-mobile-alt':         FaMobileAlt,
  'fa-infinity':           FaInfinity,
  'fa-cloud':              FaCloud,
  'fa-lightbulb':          FaLightbulb,
  'fa-graduation-cap':     FaGraduationCap,
  'fa-plug':               FaPlug,
  'fa-shopping-cart':      FaShoppingCart,
  'fa-server':             FaServer,
  'fa-code-branch':        FaCodeBranch,
  'fa-shield-alt':         FaShieldAlt,
  'fa-database':           FaDatabase,
  'fa-chalkboard-teacher': FaChalkboardTeacher,
  'fa-store':              FaStore,
  'fa-project-diagram':    FaProjectDiagram,
  'fa-university':         FaUniversity,
  'fa-city':               FaCity,
  'fa-certificate':        FaCertificate,
};
