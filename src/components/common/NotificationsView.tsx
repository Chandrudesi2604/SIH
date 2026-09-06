import React, { useState } from 'react';
import { AppNotification } from '../../types';
import {
  Bell,
  CheckCircle2,
  Clock,
  Briefcase,
  GraduationCap,
  Award,
  AlertCircle,
  CheckCheck,
  Filter,
} from 'lucide-react';

interface NotificationsViewProps {
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onNavigate: (page: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onNavigate,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Placement', 'Internship', 'Assessment', 'Academic', 'System'];

  const filtered = notifications.filter(
    (n) => filterCategory === 'All' || n.category === filterCategory
  );

  const getCategoryBadge = (cat: AppNotification['category']) => {
    switch (cat) {
      case 'Placement':
        return { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: Briefcase };
      case 'Internship':
        return { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Clock };
      case 'Assessment':
        return { color: 'bg-amber-100 text-amber-800 border-amber-200', icon: Award };
      case 'Academic':
        return { color: 'bg-stone-100 text-stone-800 border-stone-200', icon: GraduationCap };
      default:
        return { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: AlertCircle };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">Notifications &amp; Alerts</h1>
            <span className="bg-amber-100 text-amber-900 font-bold text-xs px-2.5 py-0.5 rounded-full border border-amber-200">
              {notifications.filter((n) => !n.isRead).length} New
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Real-time updates across university placements, mentor evaluations, and NOC clearances.
          </p>
        </div>

        <button
          onClick={onMarkAllAsRead}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <CheckCheck className="w-4 h-4 text-emerald-700" />
          Mark all as read
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 text-xs">
        <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              filterCategory === cat
                ? 'bg-[#0c2f21] text-white shadow-sm'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-xs text-stone-500">
            <Bell className="w-8 h-8 mx-auto text-stone-300 mb-2" />
            No notifications in this category.
          </div>
        ) : (
          filtered.map((item) => {
            const badge = getCategoryBadge(item.category);
            const BadgeIcon = badge.icon;
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!item.isRead) onMarkAsRead(item.id);
                  if (item.actionTarget) onNavigate(item.actionTarget);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  !item.isRead
                    ? 'bg-amber-50/40 border-amber-200 shadow-sm'
                    : 'bg-white border-stone-200 hover:bg-stone-50/60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg border ${badge.color} shrink-0 mt-0.5`}>
                    <BadgeIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-stone-900">{item.title}</h4>
                      {!item.isRead && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.message}</p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-stone-400">
                      <span>{item.timestamp}</span>
                      <span>•</span>
                      <span className="font-semibold text-stone-500">{item.category}</span>
                      {item.actionTarget && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-700 font-semibold underline">
                            View {item.actionTarget}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {!item.isRead && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkAsRead(item.id);
                    }}
                    className="text-xs text-stone-400 hover:text-stone-700 p-1 shrink-0 cursor-pointer"
                    title="Mark as read"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
