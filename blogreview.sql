CREATE DATABASE IF NOT EXISTS blogreview default charset utf8 ;
use blogreview;
-- ----------------------------
-- Table structure for `blogreview`
-- ----------------------------
DROP TABLE IF EXISTS `subscripttions_info`;
CREATE TABLE `subscripttions_info` (
  `id`              int(11) NOT NULL auto_increment,
  `name`            varchar(128) default NULL,
  `headpath`        varchar(1024) default NULL,
  `description`     varchar(1024) default NULL,
  `password`        varchar(128) default NULL,
  `openid`          varchar(128) default NULL,
  `token`           varchar(128) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
 
INSERT INTO `subscripttions_info` VALUES (1, 'test', 'test', 'test',  '2222555ds2f', '2699', 'eeeeeeeeeeeeeeeeeeeeee');



-- ----------------------------
-- Table structure for `article_list`
-- ----------------------------
DROP TABLE IF EXISTS `article_list`;
CREATE TABLE `article_list` (
  `blog_id`         int(11) NOT NULL auto_increment,
  `title`             varchar(128) default NULL,
  `desc`            varchar(128) default NULL,
  `image_url`         varchar(128) default NULL,
  `date`              datetime default NULL,
  `subscripttion_id`  int(11) default NULL,

  PRIMARY KEY  (`blog_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
INSERT INTO `article_list` VALUES (1,'testtitle','test desc','tese-img-url','2019/09/09',1);



-- ----------------------------
-- Table structure for `user_info`
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `uid`     int(11) NOT NULL auto_increment,
  `uname`     varchar(32) default NULL,
  `avatarUrl`  varchar(1024) default NULL,
  `country`   varchar(16) default NULL,
  `city`     varchar(128) default NULL,
  `province`   varchar(128) default NULL,
  `gender`   int(1) default NULL,
  `language` varchar(32) default NULL,
  `token`    varchar(128) default NULL,
  PRIMARY KEY  (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` (`uid`, `uname`, `avatarUrl`, `country`, `city`, `province`, `gender`, `language` , `token`) VALUES
                        (1, 'test', 'test-img', 'china', 'shanghai', 'shanghai', 0 , 'zh-cn', NULL),

                        (2, '1111', '111111', 'china', 'shanghai', '������--',1, NULL, NULL);



-- ----------------------------
-- Table structure for `user_message`
-- ----------------------------
DROP TABLE IF EXISTS `user_message`;
CREATE TABLE `user_message` (
  `u_message_id`	      int(11) NOT NULL ,
  `uid`	               int(11) NOT NULL ,
  `blog_id`             int(11) NOT NULL ,
  `user_message`      varchar(1024) default NULL,
  `author_message`	  int(11) NOT NULL ,
  `is_top`            int(11) default NULL,
  `is_show`           int(11) NOT NULL ,
  
  `like_number`       varchar(64) default NULL,
  `token`             varchar(128) default NULL,
  PRIMARY KEY  (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_message
-- ----------------------------




-- ----------------------------
-- Table structure for `user_message`
-- ----------------------------
DROP TABLE IF EXISTS `user_message_likes`;
CREATE TABLE `user_message_likes` (
  `u_msg_like_id`   int(11) NOT NULL auto_increment,
  `uid`	               int(11) NOT NULL ,
  `blog_id`             int(11) NOT NULL ,
  `like_date`         datetime default NULL,
  `token`             varchar(128) default NULL,
  PRIMARY KEY  (`u_msg_like_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

