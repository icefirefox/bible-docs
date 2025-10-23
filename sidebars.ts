import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  "bibleSidebar": [
    "introduction",
    {
      "type": "category",
      "label": "旧约 Old Testament",
      "items": [
        {
          "type": "category",
          "label": "Genesis",
          "items": [
            "old-testament/genesis/01"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "新约 New Testament",
      "items": [
        {
          "type": "category",
          "label": "Matthew",
          "items": [
            "new-testament/matthew/01"
          ]
        }
      ]
    }
  ]
};

export default sidebars;
