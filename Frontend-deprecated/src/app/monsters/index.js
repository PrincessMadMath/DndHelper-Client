import Manage from "./MonsterEditing";
import Database from "./MonstersDatabase";
import Showcase from "./MonstersShowcaseProvider";
import * as components from "./components";

import * as actions from "./store/actions";
import * as constants from "./store/constants";
import reducer from "./store/reducer";

export default {
  Manage,
  Database,
  Showcase,
  components,
  actions,
  constants,
  reducer
};
