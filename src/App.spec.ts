// @ts-nocheck

import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import { useTodoStore } from '@/stores/todo';
import { vi, beforeEach, afterEach, expect, describe, it } from 'vitest';

vi.mock('@/stores/todo'); // Mock the store

describe('App.vue', () => {
    let addEventListenerSpy: vi.SpyInstance;
    let removeEventListenerSpy: vi.SpyInstance;

    beforeEach(() => {
        addEventListenerSpy = vi.spyOn(window, 'addEventListener');
        removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
        (useTodoStore as vi.Mock).mockReturnValue({
            saveTasks: vi.fn(),
            getTasks: vi.fn(),
        });
    });

    afterEach(() => {
        addEventListenerSpy.mockRestore();
        removeEventListenerSpy.mockRestore();
    });

    it('calls getTasks on mounted', async () => {
        const wrapper = mount(App);
        const store = useTodoStore();

        expect(store.getTasks).toHaveBeenCalled();
    });

    it('adds and removes beforeunload event listener', async () => {
        const wrapper = mount(App);
        const store = useTodoStore();

        expect(addEventListenerSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));

        wrapper.unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
    });

    it('calls saveTasks on unmount', async () => {
        const wrapper = mount(App);
        const store = useTodoStore();

        wrapper.unmount();

        expect(store.saveTasks).toHaveBeenCalled();
    });
});
