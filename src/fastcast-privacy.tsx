import { mountPage } from './lib/mountPage.tsx';
import { FastCastPrivacy } from './FastCastPrivacy.tsx';
import './index.css';
import './fastcast-v2.css';
import './fastcast-privacy.css';

export function Page() {
  return <FastCastPrivacy />;
}

mountPage(<Page />);
