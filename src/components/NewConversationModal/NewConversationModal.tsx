/**
 * NewConversationModal — Pixel-perfect replica from live website.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale, scale, verticalScale } from '../../utils';

interface NewConversationModalProps {
  visible: boolean;
  onClose: () => void;
  onStartChat: (title: string, subject: string, chapter: string) => void;
}

const NewConversationModal: React.FC<NewConversationModalProps> = ({
  visible,
  onClose,
  onStartChat,
}) => {
  const [title, setTitle] = useState('Learning: MATHEMATICS — Permutations and Combinations');
  const [subject, setSubject] = useState('MATHEMATICS');
  const [chapter, setChapter] = useState('Permutations and Combinations');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={styles.modal}
            >
              {/* Header row */}
              <View style={styles.headerRow}>
                <View style={{ width: moderateScale(28) }} />
                <Text style={styles.modalTitle}>New Conversation</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <Icon name="close" size={moderateScale(22)} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalSub}>
                Give your chat a title and select the subject{'\n'}you'd like to discuss.
              </Text>

              {/* Chat Title */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>
                  Chat Title  <Text style={styles.required}>*</Text>
                </Text>
                <View style={[styles.inputWrap, styles.inputWrapFocused]}>
                  <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter chat title"
                    placeholderTextColor="#C4C8CF"
                  />
                </View>
              </View>

              {/* Subject */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>
                  Subject  <Text style={styles.required}>*</Text>
                </Text>
                <TouchableOpacity style={styles.dropdownWrap} activeOpacity={0.7}>
                  <Text style={styles.dropdownValue}>{subject}</Text>
                  <Icon name="chevron-down" size={moderateScale(18)} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              {/* Chapter */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Chapter (Optional)</Text>
                <TouchableOpacity style={styles.dropdownWrap} activeOpacity={0.7}>
                  <Text style={styles.dropdownValue}>{chapter}</Text>
                  <Icon name="chevron-down" size={moderateScale(18)} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              {/* Actions */}
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.startBtn}
                  onPress={() => onStartChat(title, subject, chapter)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.startBtnText}>Start Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  modal: {
    backgroundColor: '#FFF',
    borderRadius: moderateScale(16),
    width: '100%',
    maxWidth: 420,
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(28),
    paddingBottom: verticalScale(24),
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  modalTitle: {
    fontSize: moderateScale(22),
    fontWeight: '800',
    color: '#1A1A2E',
    textAlign: 'center',
  },
  closeBtn: {
    width: moderateScale(28),
    height: moderateScale(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSub: {
    fontSize: moderateScale(13),
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: moderateScale(20),
    marginBottom: verticalScale(24),
  },
  fieldGroup: {
    marginBottom: verticalScale(18),
  },
  fieldLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#374151',
    marginBottom: verticalScale(6),
  },
  required: {
    color: '#EF4444',
    fontWeight: '700',
  },
  inputWrap: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(14),
    height: verticalScale(48),
    justifyContent: 'center',
  },
  inputWrapFocused: {
    borderColor: '#5CBCE8',
    borderWidth: 2,
  },
  input: {
    fontSize: moderateScale(14),
    color: '#374151',
    padding: 0,
  },
  dropdownWrap: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(14),
    height: verticalScale(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownValue: {
    fontSize: moderateScale(14),
    color: '#374151',
  },
  actions: {
    marginTop: verticalScale(8),
  },
  startBtn: {
    backgroundColor: '#5CBCE8',
    borderRadius: moderateScale(10),
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  startBtnText: {
    color: '#FFF',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  cancelBtn: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: moderateScale(10),
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#6B7280',
    fontSize: moderateScale(15),
    fontWeight: '600',
  },
});

export default NewConversationModal;
