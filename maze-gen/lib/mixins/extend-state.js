import _ from "lodash";

const extendStateMixin = {
    extendState(...sources) {
        this.setState(_.extend({}, this.state, ...sources));
    }
};

export default extendStateMixin;