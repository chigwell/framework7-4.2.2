import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-panel',
  props: Object.assign({
    id: [String, Number],
    side: String,
    effect: String,
    cover: Boolean,
    reveal: Boolean,
    left: Boolean,
    right: Boolean,
    opened: Boolean
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const props = this.props;
    const {
      id,
      style
    } = props;
    return _h('div', {
      ref: 'el',
      style: style,
      class: this.classes,
      attrs: {
        id: id
      }
    }, [this.$slots['default']]);
  },

  computed: {
    classes() {
      const self = this;
      const props = self.props;
      const {
        left,
        reveal,
        className,
        opened
      } = props;
      let {
        side,
        effect
      } = props;
      side = side || (left ? 'left' : 'right');
      effect = effect || (reveal ? 'reveal' : 'cover');
      return Utils.classNames(className, 'panel', {
        'panel-active': opened,
        [`panel-${side}`]: side,
        [`panel-${effect}`]: effect
      }, Mixins.colorClasses(props));
    },

    props() {
      return __vueComponentProps(this);
    }

  },
  watch: {
    'props.opened': function watchOpened(opened) {
      const self = this;
      if (!self.$f7) return;
      const side = self.props.side || (self.props.left ? 'left' : 'right');

      if (opened) {
        self.$f7.panel.open(side);
      } else {
        self.$f7.panel.open(side);
      }
    }
  },

  created() {
    Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed', 'onBackdropClick', 'onPanelSwipe', 'onPanelSwipeOpen', 'onBreakpoint']);
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    const {
      side,
      effect,
      opened,
      left,
      reveal
    } = self.props;

    if (el) {
      el.addEventListener('panel:open', self.onOpen);
      el.addEventListener('panel:opened', self.onOpened);
      el.addEventListener('panel:close', self.onClose);
      el.addEventListener('panel:closed', self.onClosed);
      el.addEventListener('panel:backdrop-click', self.onBackdropClick);
      el.addEventListener('panel:swipe', self.onPanelSwipe);
      el.addEventListener('panel:swipeopen', self.onPanelSwipeOpen);
      el.addEventListener('panel:breakpoint', self.onBreakpoint);
    }

    self.$f7ready(() => {
      const $ = self.$$;
      if (!$) return;

      if ($('.panel-backdrop').length === 0) {
        $('<div class="panel-backdrop"></div>').insertBefore(el);
      }

      self.f7Panel = self.$f7.panel.create({
        el
      });
    });

    if (opened) {
      el.style.display = 'block';
    }

    const $ = self.$$;
    if (!$) return;
    const panelSide = side || (left ? 'left' : 'right');
    const panelEffect = effect || (reveal ? 'reveal' : 'cover');

    if (opened) {
      $('html').addClass(`with-panel-${panelSide}-${panelEffect}`);
    }
  },

  beforeDestroy() {
    const self = this;
    if (self.f7Panel) self.f7Panel.destroy();
    const el = self.$refs.el;
    if (!el) return;
    el.removeEventListener('panel:open', self.onOpen);
    el.removeEventListener('panel:opened', self.onOpened);
    el.removeEventListener('panel:close', self.onClose);
    el.removeEventListener('panel:closed', self.onClosed);
    el.removeEventListener('panel:backdrop-click', self.onBackdropClick);
    el.removeEventListener('panel:swipe', self.onPanelSwipe);
    el.removeEventListener('panel:swipeopen', self.onPanelSwipeOpen);
    el.removeEventListener('panel:breakpoint', self.onBreakpoint);
  },

  methods: {
    onOpen(event) {
      this.dispatchEvent('panel:open panelOpen', event);
    },

    onOpened(event) {
      this.dispatchEvent('panel:opened panelOpened', event);
    },

    onClose(event) {
      this.dispatchEvent('panel:close panelClose', event);
    },

    onClosed(event) {
      this.dispatchEvent('panel:closed panelClosed', event);
    },

    onBackdropClick(event) {
      this.dispatchEvent('panel:backdrop-click panelBackdropClick', event);
    },

    onPanelSwipe(event) {
      this.dispatchEvent('panel:swipe panelSwipe', event);
    },

    onPanelSwipeOpen(event) {
      this.dispatchEvent('panel:swipeopen panelSwipeOpen', event);
    },

    onBreakpoint(event) {
      this.dispatchEvent('panel:breakpoint panelBreakpoint', event);
    },

    open(animate) {
      const self = this;
      if (!self.$f7) return;
      const side = self.props.side || (self.props.left ? 'left' : 'right');
      self.$f7.panel.open(side, animate);
    },

    close(animate) {
      const self = this;
      if (!self.$f7) return;
      const side = self.props.side || (self.props.left ? 'left' : 'right');
      self.$f7.panel.close(side, animate);
    },

    toggle(animate) {
      const self = this;
      if (!self.$f7) return;
      const side = self.props.side || (self.props.left ? 'left' : 'right');
      self.$f7.panel.toggle(side, animate);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  }
};