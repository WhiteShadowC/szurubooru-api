interface SzuruError<E extends SzuruErrors = SzuruErrors> {
  name: SzuruErrors;
  title: string;
  description: string;
}

type SzuruErrors =
  | 'MissingRequiredFileError'
  | 'MissingRequiredParameterError'
  | 'InvalidParameterError'
  | 'IntegrityError'
  | 'SearchError'
  | 'AuthError'
  | 'PostNotFoundError'
  | 'PostAlreadyFeaturedError'
  | 'PostAlreadyUploadedError'
  | 'InvalidPostIdError'
  | 'InvalidPostSafetyError'
  | 'InvalidPostSourceError'
  | 'InvalidPostContentError'
  | 'InvalidPostRelationError'
  | 'InvalidPostNoteError'
  | 'InvalidPostFlagError'
  | 'InvalidFavoriteTargetError'
  | 'InvalidCommentIdError'
  | 'CommentNotFoundError'
  | 'EmptyCommentTextError'
  | 'InvalidScoreTargetError'
  | 'InvalidScoreValueError'
  | 'TagCategoryNotFoundError'
  | 'TagCategoryAlreadyExistsError'
  | 'TagCategoryIsInUseError'
  | 'InvalidTagCategoryNameError'
  | 'InvalidTagCategoryColorError'
  | 'TagNotFoundError'
  | 'TagAlreadyExistsError'
  | 'TagIsInUseError'
  | 'InvalidTagNameError'
  | 'InvalidTagRelationError'
  | 'InvalidTagCategoryError'
  | 'InvalidTagDescriptionError'
  | 'UserNotFoundError'
  | 'UserAlreadyExistsError'
  | 'InvalidUserNameError'
  | 'InvalidEmailError'
  | 'InvalidPasswordError'
  | 'InvalidRankError'
  | 'InvalidAvatarError'
  | 'ProcessingError'
  | 'ValidationError'
  | 'Unknown';
