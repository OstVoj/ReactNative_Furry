import React from 'react'
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'

import SearchResultsInput from './components/SearchResultsInput'
import SearchResultsItem from './components/SearchResultsItem'
import { PlacesProfileModal } from 'src/containers/PlaceProfile/Modal'

const styles = StyleSheet.create({
  searchResultsList: {
    padding: 16,
    marginTop: 4,
    marginBottom: 80,
    backgroundColor: '#ffffff'
  }
})

function SearchResults ({
  visible,
  value,
  onChange,
  close,
  results,
  placeId,
  showProfileModal,
  openProfileModal,
  onLoadMore,
  closeProfileModal
}) {
  return (
    <Modal
      visible={visible}
      onRequestClose={() => {}}
    >
      <SafeAreaView>
        <SearchResultsInput
          value={value}
          onChange={onChange}
          close={close}
        />

        <FlatList
          style={styles.searchResultsList}
          data={results}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={openProfileModal(item.id)}>
              <SearchResultsItem {...item} />
            </TouchableOpacity>
          )}
          keyExtractor={item => `${item.id}`}
          onEndReached={onLoadMore}
          onEndReachedThreshold={50}
        />
      </SafeAreaView>

      <PlacesProfileModal
        isVisible={showProfileModal}
        placeId={placeId}
        onClose={closeProfileModal}
      />
    </Modal>
  )
}

export default SearchResults
