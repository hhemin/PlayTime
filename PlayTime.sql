/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : localhost:3306
 Source Schema         : PlayTime

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 27/08/2020 01:02:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dayInfo
-- ----------------------------
DROP TABLE IF EXISTS `dayInfo`;
CREATE TABLE `dayInfo` (
  `dayInfo_id` int(11) NOT NULL AUTO_INCREMENT,
  `dayInfo_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_croatian_ci NOT NULL COMMENT '计划名称',
  `dayInfo_repeat` tinyint(255) NOT NULL DEFAULT '0' COMMENT '重复时间0:永不，1每天，2每周，3每月',
  `dayInfo_time` time NOT NULL COMMENT '计划时间 hh:mm:ss',
  `uid` int(11) DEFAULT NULL COMMENT '用户id',
  `dayInfo_start` datetime DEFAULT NULL COMMENT '项目开始日期',
  `createtime` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatetime` datetime DEFAULT NULL COMMENT '更新编辑时间',
  `delettime` datetime DEFAULT NULL COMMENT '删除时间',
  `status` int(2) DEFAULT '0' COMMENT '开启时间：0未开始，1暂停，2结束',
  `f_uptime` datetime DEFAULT NULL COMMENT '项目进度更新时间',
  `finishtime` time DEFAULT NULL COMMENT '这个项目完成剩下时间',
  `dayInfo_hour` int(2) NOT NULL DEFAULT '0' COMMENT '计划时间 小时',
  `dayInfo_minute` int(20) NOT NULL DEFAULT '0' COMMENT '计划时间 分钟',
  PRIMARY KEY (`dayInfo_id`) USING BTREE,
  KEY `用户id` (`uid`),
  CONSTRAINT `用户id` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci COMMENT='用户创建时间计划表';

-- ----------------------------
-- Records of dayInfo
-- ----------------------------
BEGIN;
INSERT INTO `dayInfo` VALUES (19, '学习', 1, '00:59:00', 1, NULL, '2020-08-12 17:46:42', NULL, NULL, 1, '2020-08-12 17:46:42', '00:58:00', 0, 0);
INSERT INTO `dayInfo` VALUES (95, '小程序添加哦', 1, '00:01:00', 1, NULL, '2020-08-27 00:01:54', NULL, NULL, 2, '2020-08-27 00:01:54', '00:00:00', 0, 1);
INSERT INTO `dayInfo` VALUES (96, '刷牙', 1, '00:01:00', 1, NULL, '2020-08-27 00:05:29', NULL, NULL, 0, NULL, NULL, 0, 1);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_croatian_ci DEFAULT NULL COMMENT '用户名称',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_croatian_ci DEFAULT NULL COMMENT '用户密码',
  `createtime` datetime NOT NULL COMMENT '创建时间',
  `updatetime` datetime DEFAULT NULL COMMENT '更新时间',
  `openid` varchar(0) CHARACTER SET utf8 COLLATE utf8_croatian_ci DEFAULT NULL COMMENT '微信登录获取的openid',
  `deletetime` datetime DEFAULT NULL COMMENT '删除用户标识别',
  `scope` int(255) DEFAULT '1' COMMENT '权限',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'admin', '$2b$10$WT06y8mgnGpwmayVfDtqrO6LVwo0oSD3TceiYtf79InZDhT.MSOxq', '2020-08-03 23:04:03', '2020-08-03 23:04:19', NULL, NULL, 2);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
