import '@babel/polyfill';
import 'vue';
import Rete from "rete";
import ConnectionPlugin from 'rete-connection-plugin';
import VueRenderPlugin from 'rete-vue-render-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';

const numSocket = new Rete.Socket('Number value');

class NumComponent extends Rete.Component {
    constructor() {
        super('Number');
    }

    builder(node) {
        let out = new Rete.Output('num', 'Number', numSocket);

        node.addOutput(out);
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.data.num;
    }
}

(async () => {
  const container = document.querySelector('#rete');
  const editor = new Rete.NodeEditor('demo@0.1.0', container);

  editor.use(ConnectionPlugin);
  editor.use(VueRenderPlugin);
  editor.use(ContextMenuPlugin);

  const numComponent = new NumComponent();
  editor.register(numComponent);
})();
