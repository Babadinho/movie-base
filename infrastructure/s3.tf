###################
# S3 RESOURCES
###################

resource "aws_s3_bucket" "movie_base_s3_bucket" {
  bucket        = local.prefix
  force_destroy = true
  tags          = local.common_tags
}

# SET S3 BUCKET WEBSITE CONFIGURATION
resource "aws_s3_bucket_website_configuration" "movie_base_s3_bucket" {
  bucket = local.prefix

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

# SET S3 BUCKET VERSIONING
resource "aws_s3_bucket_versioning" "movie_base_s3_bucket_versioning" {
  bucket = local.prefix
  versioning_configuration {
    status = "Enabled"
  }
}

# SET S3 BUCKET ACL
resource "aws_s3_bucket_ownership_controls" "movie_base_s3_bucket" {
  bucket = local.prefix
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "movie_base_s3_bucket" {
  bucket = local.prefix

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "movie_base_s3_bucket" {
  depends_on = [
    aws_s3_bucket_ownership_controls.movie_base_s3_bucket,
    aws_s3_bucket_public_access_block.movie_base_s3_bucket,
  ]

  bucket = local.prefix
  acl    = "public-read"
}

# SET S3 BUCKET POLICY
resource "aws_s3_bucket_policy" "allow_access_from_cloudfront" {
  bucket = local.prefix
  policy = data.aws_iam_policy_document.allow_access_from_cloudfront.json
}

# data "aws_iam_policy_document" "allow_access_from_another_account" {
#   statement {
#     sid = "PublicReadGetObject"

#     principals {
#       type        = "AWS"
#       identifiers = ["485146078875"]
#     }

#     actions = [
#       "s3:GetObject",
#       "s3:ListBucket",
#     ]

#     resources = [
#       aws_s3_bucket.movie_base_s3_bucket.arn,
#       "${aws_s3_bucket.movie_base_s3_bucket.arn}/*",
#     ]
#   }
# }

data "aws_iam_policy_document" "allow_access_from_cloudfront" {
  statement {
    sid = "AllowCloudFrontServicePrincipalRead"
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    actions = [
      "s3:GetObject",
    ]
    resources = [
      "${aws_s3_bucket.movie_base_s3_bucket.arn}/*",
    ]

    condition {
      test     = "StringLike"
      variable = "AWS:SourceArn"

      values = [
        aws_cloudfront_distribution.s3_distribution.arn
      ]
    }
  }

  depends_on = [
    aws_s3_bucket.movie_base_s3_bucket
  ]
}


