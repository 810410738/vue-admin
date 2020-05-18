<template>
  <codemirror
    ref="myCm"
    v-model="item.content"
    :options="cmOptions"
    class="code"
  ></codemirror>
</template>

<script>
import { codemirror } from 'vue-codemirror'

import 'codemirror/mode/javascript/javascript.js'

import 'codemirror/lib/codemirror.css'

import 'codemirror/theme/eclipse.css';

import "codemirror/addon/fold/foldgutter.css"

import 'codemirror/addon/fold/foldcode.js';

import 'codemirror/addon/fold/foldgutter.js';

import 'codemirror/addon/fold/xml-fold.js';

import 'codemirror/addon/fold/indent-fold.js';

import "codemirror/addon/fold/brace-fold";

import 'codemirror/addon/fold/markdown-fold.js';

import 'codemirror/addon/fold/comment-fold.js';

import 'codemirror/addon/selection/active-line';

// import 'codemirror/addon/edit/closeBrackets';

// import 'codemirror/addon/edit/matchBrackets';



export default {
  components: {
    codemirror
  },
  data() {
    return {
      item:{
        content:''
      },
      cmOptions:{
        tabSize:2,
        mode:{name: "javascript", json: true},
        theme:'eclipse',
        lineNumbers:true,
        lineWrapping:true,
        matchBrackets:true,
        line:true
      }
    };
  },
  methods: {
    
  }
};
</script>