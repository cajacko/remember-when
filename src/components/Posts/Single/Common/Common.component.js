// @flow

import React, { Component } from 'react';
import withRouter from '@cajacko/lib/components/HOCs/withRouter';
import Form from '@cajacko/lib/components/Forms/Form';
import { ensureDate } from '@cajacko/lib/utils/dates';
import PostsSingle from './Common.render';

/**
 * Business logic for the single posts component. Handle text change and submit
 */
class PostsSingleCommonComponent extends Component {
  /**
   * Initialise the class, set the initial state and bind the methods
   *
   * @param {Object} props The props passed to the component, check flow for
   * more detail
   *
   * @return {Void} No return value
   */
  constructor(props) {
    super(props);

    this.state = {
      editing: this.isNewPost(props),
    };

    this.save = this.save.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.onTextAreaFocus = this.onTextAreaFocus.bind(this);
    this.setTextAreaRef = this.setTextAreaRef.bind(this);
  }

  save({ content, date, hideDatePicker }, dataHasChanged) {
    return () => {
      if (dataHasChanged) {
        this.props.save(this.props.id, content, date);
      }

      hideDatePicker();

      if (this.isNewPost()) {
        this.props.history.push('/');
      } else {
        this.setState({ editing: false });
      }
    };
  }

  toggleEditMode(editing) {
    return () => {
      if (!editing && this.isNewPost()) {
        this.props.history.goBack();
      } else {
        if (this.state.editing === editing) return;
        this.setState({ editing });
      }
    };
  }

  isNewPost(props) {
    const {
      location: { pathname },
      id,
    } = props || this.props;

    return pathname === '/new-post' || !id;
  }

  isPostInEditMode(props) {
    return this.state.editing || this.isNewPost(props);
  }

  deletePost() {
    this.props.delete(this.props.id);

    this.props.history.push('/');
  }

  showDatePicker(showDatePicker) {
    return () => {
      if (this.textArea) this.textArea.blur();
      this.toggleEditMode(true)();
      showDatePicker('date')();
    };
  }

  onTextAreaFocus() {
    if (!this.state.editing) {
      this.toggleEditMode(true)();
    }
  }

  setTextAreaRef(ref) {
    this.textArea = ref;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.editing && !this.state.editing) {
      if (this.textArea) this.textArea.blur();
    }
  }

  /**
   * Render the component
   *
   * @return {ReactElement} Markup to render
   */
  render() {
    return (
      <Form
        date={ensureDate(this.props.date)}
        content={this.props.content}
        onCancel={this.toggleEditMode(false)}
      >
        {({
          showDatePicker,
          onChange,
          cancel,
          dataHasChanged,
          ...formState
        }) => (
          <PostsSingle
            onChange={onChange('content')}
            content={formState.content}
            isInEditMode={this.isPostInEditMode()}
            date={formState.date}
            save={this.save(formState, dataHasChanged)}
            edit={this.toggleEditMode(true)}
            showDatePicker={this.showDatePicker(showDatePicker)}
            deletePost={this.deletePost}
            isNewPost={this.isNewPost()}
            cancelEdit={cancel}
            dataHasChanged={dataHasChanged}
            onTextAreaFocus={this.onTextAreaFocus}
            setTextAreaRef={this.setTextAreaRef}
          />
        )}
      </Form>
    );
  }
}

PostsSingleCommonComponent.defaultProps = {
  content: '',
  date: new Date(),
};

export default withRouter(PostsSingleCommonComponent);